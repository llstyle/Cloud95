import type Types from "../enum/types.enum";

interface IFile {
  id: string,
  name: string,
  type: Types,
  size: number,
}

export type { IFile }