// "use client";

// // External Libraries
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Internal Modules
// import styles from "./BioGraphy.module.css";

// const BioGraphy = ({id}) => {
//   const [artistData, setArtistData] = useState({
//     name: "",
//     parentId: "",
//     birthDate: "",
//     deathDate: "",
//     location: "",
//     occupation: "",
//     about: "",
//   });

//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   // EXTRACT URL IN .env.development file
//   const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;
//   const familyMemberRoute = process.env.NEXT_PUBLIC_FAMILY_MEMBER_ROUTE;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${apiUrl}${familyMemberRoute}/${id}`
//         );
//         const data = response.data;

//         if (!data.error) {
//           // Update the familyMemberData state with the fetched data
//           setFamilyMemberData(data);
//         } else {
//           setError(data.error);
//         }

//         setIsLoading(false);
//       } catch (error) {
//         // Handle errors if the data fetching fails
//         console.error("Error fetching data:", error);
//         setError("Failed to fetch data.");
//         setIsLoading(false);
//       }
//     };

//     // Call the fetchData function when the component mounts
//     fetchData();
//   }, []);

//   return (
//     <div className={styles.biography}>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           {error && <p className={styles.errorText}>{error}</p>}
//           <div className={styles.content}>
//             <div className={styles.imagepart}>
//               <img src="/images/testimg.jpg" alt="testimg" />
//             </div>
//             <div className={styles.textpart}>
//               <h1>{artistData.name}</h1>
//               <div className={styles.info}>
//                 <p className={styles.label}>Birth:</p>
//                 <p>{artistData.birthDate}</p>
//                 <p className={styles.label}>Death:</p>
//                 <p>{artistData.deathDate}</p>
//                 <p className={styles.label}>Location:</p>
//                 <p>{artistData.location}</p>
//                 <p className={styles.label}>Occupation:</p>
//                 <p>{artistData.occupation}</p>
//               </div>
//             </div>
//             <div className={styles.buttons}>
//               <button className={styles.editbutton}>Edit</button>
//             </div>
//           </div>
//           <div className={styles.downside}>
//             <div className={styles.downsidecard}>
//               <h3>ABOUT EMILY</h3>
//               <p>{artistData.about}</p>
//             </div>
//             <div className={styles.downsidecard}>
//               <h3 className={styles.comment_title}>COMMENTS</h3>
//               <p className={styles.name}>
//                 Michael Busch <span className={styles.date}>6 days ago</span>
//               </p>
//               <p>I still have her painting of us in my kitchen!</p>
//               <div className={styles.commentbox}>
//                 <textarea
//                   className={styles.commentinput}
//                   placeholder="Add a comment..."
//                 />
//                 <div>
//                   <button className={styles.commentbutton}>Post</button>
//                   <button className={styles.commentbutton}>Cancel</button>
//                 </div>
//               </div>
//             </div>
//             <div className={styles.downsidecard}>
//               <h3>SUGGEST AN EDIT</h3>
//               <p className={styles.name}>
//                 Michael Busch <span className={styles.date}>6 days ago</span>
//               </p>
//               <p>I still have her painting of us in my kitchen!</p>
//               <div className={styles.commentbox}>
//                 <textarea
//                   className={styles.commentinput}
//                   type="text"
//                   placeholder="Add a comment..."
//                 />
//                 <div>
//                   <button className={styles.commentbutton}>Post</button>
//                   <button className={styles.commentbutton}>Cancel</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default BioGraphy;


"use client";

// External Libraries
import React, { useState, useEffect } from "react";
import axios from "axios";

// Internal Modules
import styles from "./BioGraphy.module.css";

const BioGraphy = ({ id }) => {
  const [artistData, setArtistData] = useState({
    name: "",
    parentId: "",
    birthDate: "",
    deathDate: "",
    location: "",
    occupation: "",
    about: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // EXTRACT URL IN .env.development file
  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;
  const familyMemberRoute = process.env.NEXT_PUBLIC_FAMILY_MEMBER_ROUTE;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}${familyMemberRoute}/${id}`
        );
        const data = response.data;

        if (!data.error) {
          // Update the artistData state with the fetched data
          setArtistData(data);
        } else {
          setError(data.error);
        }

        setIsLoading(false);
      } catch (error) {
        // Handle errors if the data fetching fails
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
        setIsLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [apiUrl, familyMemberRoute, id]);

  return (
    <div className={styles.biography}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p className={styles.errorText}>{error}</p>}
          <div className={styles.content}>
            <div className={styles.textpart}>
              <h1>{artistData.name}</h1>
              <div className={styles.info}>
                <p className={styles.label}>Birth:</p>
                <p>{artistData.birthDate}</p>
                <p className={styles.label}>Death:</p>
                <p>{artistData.deathDate}</p>
                <p className={styles.label}>Location:</p>
                <p>{artistData.location}</p>
                <p className={styles.label}>Occupation:</p>
                <p>{artistData.occupation}</p>
              </div>
            </div>
            <div className={styles.buttons}>
              <button className={styles.editbutton}>Edit</button>
            </div>
          </div>
          <div className={styles.downside}>
            <div className={styles.downsidecard}>
              <h3>ABOUT EMILY</h3>
              <p>{artistData.about}</p>
            </div>
            {/* ... Additional sections */}
          </div>
        </>
      )}
    </div>
  );
};

export default BioGraphy;
