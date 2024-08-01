interface IProfile {
  id: string,
  email: string,
  usedSpace: number,
  diskSpace: number,
  createdAt: Date,
  _count: {
    files: number,
    directories: number,
  }
}

export type { IProfile }