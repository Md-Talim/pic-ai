import { protectServer } from "@/features/auth/utils";
import Editor from "@/features/editor/components/editor";

const ProjectEditorPage = async () => {
  await protectServer();

  return <Editor />;
};

export default ProjectEditorPage;
