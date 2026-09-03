import { createContext, useContext, useState, type ReactNode } from 'react'
import { classes as initialClasses } from '@/data/mockClasses'
import { reels as initialReels } from '@/data/mockReels'
import { notifications as initialNotifications } from '@/data/mockNotifications'
import type { AcademyRow } from '@/types/dashboard'
import type { AthleteRow } from '@/types/athlete'
import type { AthleteProfileDetail } from '@/types/athleteProfile'
import type { CoachSummary } from '@/types/coach'
import type { AcademyClass } from '@/types/academyClass'
import type { Reel } from '@/types/reel'
import type { ProgramSummary } from '@/data/mockPrograms'
import type { Facility } from '@/data/mockFacilities'
import type { NotificationItem } from '@/data/mockNotifications'

interface DataStoreContextValue {
  extraAcademies: AcademyRow[]
  addAcademy: (academy: AcademyRow) => void
  academyOverrides: Record<string, Partial<AcademyRow>>
  updateAcademy: (id: string, patch: Partial<AcademyRow>) => void

  extraAthletes: AthleteRow[]
  extraAthleteProfiles: Record<string, AthleteProfileDetail>
  addAthlete: (athlete: AthleteRow, profile: AthleteProfileDetail) => void
  athleteOverrides: Record<string, Partial<AthleteRow>>
  updateAthlete: (id: string, patch: Partial<AthleteRow>) => void
  athleteProfileOverrides: Record<string, Partial<AthleteProfileDetail>>
  updateAthleteProfile: (id: string, patch: Partial<AthleteProfileDetail>) => void

  extraCoaches: CoachSummary[]
  addCoach: (coach: CoachSummary) => void
  coachOverrides: Record<string, Partial<CoachSummary>>
  updateCoach: (id: string, patch: Partial<CoachSummary>) => void

  extraPrograms: ProgramSummary[]
  addProgram: (program: ProgramSummary) => void

  extraFacilities: Facility[]
  addFacility: (facility: Facility) => void

  classes: AcademyClass[]
  addClass: (cls: AcademyClass) => void
  updateClass: (id: string, patch: Partial<AcademyClass>) => void
  setClassStudents: (classId: string, studentIds: string[]) => void
  assignStudentToClass: (classId: string, athleteId: string) => void
  removeStudentFromClass: (classId: string, athleteId: string) => void

  reels: Reel[]
  addReel: (reel: Reel) => void
  removeReel: (reelId: string) => void
  clearReelReport: (reelId: string) => void

  notifications: NotificationItem[]
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: (personId: string | undefined) => void
}

const DataStoreContext = createContext<DataStoreContextValue | null>(null)

export function DataStoreProvider({ children }: { children: ReactNode }) {
  const [extraAcademies, setExtraAcademies] = useState<AcademyRow[]>([])
  const [academyOverrides, setAcademyOverrides] = useState<Record<string, Partial<AcademyRow>>>({})

  const [extraAthletes, setExtraAthletes] = useState<AthleteRow[]>([])
  const [extraAthleteProfiles, setExtraAthleteProfiles] = useState<Record<string, AthleteProfileDetail>>({})
  const [athleteOverrides, setAthleteOverrides] = useState<Record<string, Partial<AthleteRow>>>({})
  const [athleteProfileOverrides, setAthleteProfileOverrides] = useState<Record<string, Partial<AthleteProfileDetail>>>({})

  const [extraCoaches, setExtraCoaches] = useState<CoachSummary[]>([])
  const [coachOverrides, setCoachOverrides] = useState<Record<string, Partial<CoachSummary>>>({})

  const [extraPrograms, setExtraPrograms] = useState<ProgramSummary[]>([])
  const [extraFacilities, setExtraFacilities] = useState<Facility[]>([])

  const [classes, setClasses] = useState<AcademyClass[]>(initialClasses)
  const [reels, setReels] = useState<Reel[]>(initialReels)
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications)

  function addAcademy(academy: AcademyRow) {
    setExtraAcademies((prev) => [...prev, academy])
  }

  function updateAcademy(id: string, patch: Partial<AcademyRow>) {
    setAcademyOverrides((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }))
  }

  function addAthlete(athlete: AthleteRow, profile: AthleteProfileDetail) {
    setExtraAthletes((prev) => [...prev, athlete])
    setExtraAthleteProfiles((prev) => ({ ...prev, [athlete.id]: profile }))
  }

  function updateAthlete(id: string, patch: Partial<AthleteRow>) {
    setAthleteOverrides((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }))
  }

  function updateAthleteProfile(id: string, patch: Partial<AthleteProfileDetail>) {
    setAthleteProfileOverrides((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }))
  }

  function addCoach(coach: CoachSummary) {
    setExtraCoaches((prev) => [...prev, coach])
  }

  function updateCoach(id: string, patch: Partial<CoachSummary>) {
    setCoachOverrides((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }))
  }

  function addProgram(program: ProgramSummary) {
    setExtraPrograms((prev) => [...prev, program])
  }

  function addFacility(facility: Facility) {
    setExtraFacilities((prev) => [...prev, facility])
  }

  function addClass(cls: AcademyClass) {
    setClasses((prev) => [...prev, cls])
  }

  function updateClass(id: string, patch: Partial<AcademyClass>) {
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }

  function setClassStudents(classId: string, studentIds: string[]) {
    setClasses((prev) => prev.map((c) => (c.id === classId ? { ...c, studentIds } : c)))
  }

  function assignStudentToClass(classId: string, athleteId: string) {
    const cls = classes.find((c) => c.id === classId)
    if (!cls) return
    setClasses((prev) =>
      prev.map((c) => (c.id === classId ? { ...c, studentIds: [...c.studentIds, athleteId] } : c)),
    )
    updateAthlete(athleteId, { batch: cls.name, coachName: cls.coachName })
  }

  function removeStudentFromClass(classId: string, athleteId: string) {
    setClasses((prev) =>
      prev.map((c) => (c.id === classId ? { ...c, studentIds: c.studentIds.filter((id) => id !== athleteId) } : c)),
    )
    updateAthlete(athleteId, { batch: 'Unassigned', coachName: '—' })
  }

  function addReel(reel: Reel) {
    setReels((prev) => [reel, ...prev])
  }

  function removeReel(reelId: string) {
    setReels((prev) => prev.map((r) => (r.id === reelId ? { ...r, status: 'Removed', reported: false } : r)))
  }

  function clearReelReport(reelId: string) {
    setReels((prev) => prev.map((r) => (r.id === reelId ? { ...r, reported: false } : r)))
  }

  function markNotificationRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  function markAllNotificationsRead(personId: string | undefined) {
    setNotifications((prev) =>
      prev.map((n) => (!n.forPersonId || n.forPersonId === personId ? { ...n, read: true } : n)),
    )
  }

  return (
    <DataStoreContext.Provider
      value={{
        extraAcademies,
        addAcademy,
        academyOverrides,
        updateAcademy,
        extraAthletes,
        extraAthleteProfiles,
        addAthlete,
        athleteOverrides,
        updateAthlete,
        athleteProfileOverrides,
        updateAthleteProfile,
        extraCoaches,
        addCoach,
        coachOverrides,
        updateCoach,
        extraPrograms,
        addProgram,
        extraFacilities,
        addFacility,
        classes,
        addClass,
        updateClass,
        setClassStudents,
        assignStudentToClass,
        removeStudentFromClass,
        reels,
        addReel,
        removeReel,
        clearReelReport,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  )
}

export function useDataStore() {
  const ctx = useContext(DataStoreContext)
  if (!ctx) throw new Error('useDataStore must be used within DataStoreProvider')
  return ctx
}
