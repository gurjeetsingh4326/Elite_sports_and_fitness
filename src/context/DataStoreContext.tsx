import { createContext, useContext, useState, type ReactNode } from 'react'
import { classes as initialClasses } from '@/data/mockClasses'
import type { AcademyRow } from '@/types/dashboard'
import type { AthleteRow } from '@/types/athlete'
import type { AthleteProfileDetail } from '@/types/athleteProfile'
import type { CoachSummary } from '@/types/coach'
import type { AcademyClass } from '@/types/academyClass'

interface DataStoreContextValue {
  extraAcademies: AcademyRow[]
  addAcademy: (academy: AcademyRow) => void

  extraAthletes: AthleteRow[]
  extraAthleteProfiles: Record<string, AthleteProfileDetail>
  addAthlete: (athlete: AthleteRow, profile: AthleteProfileDetail) => void

  extraCoaches: CoachSummary[]
  addCoach: (coach: CoachSummary) => void

  classes: AcademyClass[]
  addClass: (cls: AcademyClass) => void
  setClassStudents: (classId: string, studentIds: string[]) => void
}

const DataStoreContext = createContext<DataStoreContextValue | null>(null)

export function DataStoreProvider({ children }: { children: ReactNode }) {
  const [extraAcademies, setExtraAcademies] = useState<AcademyRow[]>([])
  const [extraAthletes, setExtraAthletes] = useState<AthleteRow[]>([])
  const [extraAthleteProfiles, setExtraAthleteProfiles] = useState<Record<string, AthleteProfileDetail>>({})
  const [extraCoaches, setExtraCoaches] = useState<CoachSummary[]>([])
  const [classes, setClasses] = useState<AcademyClass[]>(initialClasses)

  function addAcademy(academy: AcademyRow) {
    setExtraAcademies((prev) => [...prev, academy])
  }

  function addAthlete(athlete: AthleteRow, profile: AthleteProfileDetail) {
    setExtraAthletes((prev) => [...prev, athlete])
    setExtraAthleteProfiles((prev) => ({ ...prev, [athlete.id]: profile }))
  }

  function addCoach(coach: CoachSummary) {
    setExtraCoaches((prev) => [...prev, coach])
  }

  function addClass(cls: AcademyClass) {
    setClasses((prev) => [...prev, cls])
  }

  function setClassStudents(classId: string, studentIds: string[]) {
    setClasses((prev) => prev.map((c) => (c.id === classId ? { ...c, studentIds } : c)))
  }

  return (
    <DataStoreContext.Provider
      value={{
        extraAcademies,
        addAcademy,
        extraAthletes,
        extraAthleteProfiles,
        addAthlete,
        extraCoaches,
        addCoach,
        classes,
        addClass,
        setClassStudents,
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
