export interface User {
    _id: string;
    name: string;
    email: string;

   createdAt: Date;
   isEmailVerified: boolean;
   updatedAt: Date;
   profilePicture?: string;
}

export interface Workspace {
    _id: string;
    name: string;
    description?: string;
    owner: User | string;
    color: string;
    members: {
      user: User; 
      role: "admin" | "member" | "owner" | "viewer";
      joinedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
  }