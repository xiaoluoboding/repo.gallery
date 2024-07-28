import { create } from "zustand"
import { persist, devtools } from "zustand/middleware"
import { merge, cloneDeep } from "lodash-es"

import { Repo, Collection } from "@/lib/types"

export interface RepoState {
  isReRender: boolean
  isSearching: boolean
  repoList: Repo[]
  collectionList: Collection[]
  getState: () => RepoState
  setRepoList: (list: Repo[]) => void
  setCollectionList: (list: Collection[]) => void
  setRepoState: (state: Partial<RepoState>) => void
}

export const useRepoStore = create<RepoState>()(
  devtools(
    persist(
      (set, get) => ({
        isReRender: false,
        isSearching: false,
        repoList: [],
        collectionList: [],
        getState: () => get(),
        setRepoList: (repoList: Repo[]) => set((state) => ({ repoList })),
        setCollectionList: (collectionList: Collection[]) =>
          set((state) => ({ collectionList })),
        setRepoState: (state: Partial<RepoState>) => set(state),
      }),
      {
        name: "rg-repo-storage",
        merge: (persistedState, currentState) =>
          merge(currentState, persistedState),
      }
    )
  )
)
