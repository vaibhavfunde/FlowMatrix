import { useMutation, useQuery } from "@tanstack/react-query";
import type { WorkspaceForm } from "@/components/workspace/create-workspace";
import { fetchData, postData } from "../../src/lib/fetch-utils";

export const useCreateWorkspace = () => {
    return useMutation({
      mutationFn: async (data: WorkspaceForm) => postData("/workspaces", data),
    });
  };