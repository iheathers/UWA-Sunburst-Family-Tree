import BioGraphy from "../../bio/page";

const FamilyMemberPage = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <h1>Family Member</h1>
      <p>{id}</p>
      <BioGraphy id={id} />
    </div>
  );
};

export default FamilyMemberPage;
