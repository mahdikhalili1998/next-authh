import { getSession } from "next-auth/react";
function dashbord() {
  return <div>dashbord</div>;
}

export default dashbord;

export async function getServerSideProps({ req }) {
  const sessoin = await getSession({ req });
  if (!sessoin) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return { props: {} };
}
