import EditFamilyMember from "@/components/EditFamilyMember/EditFamilyMember";

const EditPage = ({ params }) => {
  const { id } = params;

  return (
    <div>
      {/* <h1>Family Member</h1>
      <p>{id}</p> */}
      <EditFamilyMember id={id} />
    </div>
  );
};

export default EditPage;
