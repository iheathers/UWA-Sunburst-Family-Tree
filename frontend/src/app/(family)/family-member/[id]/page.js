import BioGraphy from "@/components/BioGraphy/BioGraphy";

const FamilyMemberPage = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <h1>Family Member</h1>
      <p>{id}</p>
    </div>
  );
};

// export default FamilyMemberPage;

export default BioGraphy;
