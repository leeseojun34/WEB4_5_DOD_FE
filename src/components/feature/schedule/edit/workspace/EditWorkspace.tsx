import WorkspaceItem from "./WorkspaceItem";

const EditWorkspace = ({
  onEditClick,
}: {
  onEditClick: (data: { type: string; name: string; url: string }) => void;
}) => {
  
  return (
    <>
      <div className="space-y-4">
        <WorkspaceItem
          type="miro"
          name="이때어때 미로"
          url="https://www.notion.so/Team07-21e15a01205480a49fc6d1e73f119a19"
          onClick={onEditClick}
        />
        <WorkspaceItem
          type="github"
          name="이때어때 레포지토리"
          url="https://www.notion.so/Team07-21e15a01205480a49fc6d1e73f119a19"
          onClick={onEditClick}
        />
        <WorkspaceItem
          type="figma"
          name="이때어때 피그마"
          url="https://www.notion.so/Team07-21e15a01205480a49fc6d1e73f119a19"
          onClick={onEditClick}
        />
        <WorkspaceItem
          type="notion"
          name="이때어때 노션"
          url="https://www.notion.so/Team07-21e15a01205480a49fc6d1e73f119a19"
          onClick={onEditClick}
        />
        <WorkspaceItem
          type="googledocs"
          name="이때어때 구글 독스"
          url="https://www.notion.so/Team07-21e15a01205480a49fc6d1e73f119a19"
          onClick={onEditClick}
        />
        <WorkspaceItem
          type="canva"
          name="이때어때 캔바"
          url="https://www.notion.so/Team07-21e15a01205480a49fc6d1e73f119a19"
          onClick={onEditClick}
        />
      </div>
    </>
  );
};
export default EditWorkspace;
