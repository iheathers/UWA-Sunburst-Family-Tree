import BioGraphy from "@/components/BioGraphy/BioGraphy";

const FamilyMemberPage = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <BioGraphy id={id} />
    </div>
  );
};

export default FamilyMemberPage;
