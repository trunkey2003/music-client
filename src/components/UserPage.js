import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function UserPage({path}) {
  var { username } = useParams();
  const validated = useRef();
  const userDetail = useRef();

  const [firstLoading, setFirstLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userIcon, setUserIcon] = useState("");

  useEffect(() => {
    const func = async () => {
      if (firstLoading) {
        setLoading(true);
        axios
          .get(`${path}/${username}`, { mode: "cors", withCredentials: true })
          .then((result) => {
            if (result.data.username !== username)
              window.location = `/user/${result.data.username}`;
            validated.current = true;
            userDetail.current = result.data;
            setUserIcon(userDetail.current.avatar);
          })
          .catch((err) => {
            console.log(err);
            window.location.href = "/user/login";
          })
          .finally(()=>{
            setFirstLoading(false);
            setLoading(false)
          })
      }
    };

    func();
    console.log(userDetail);
    // eslint-disable-next-line
  }, [firstLoading]);

  return <div>User Page : {username}</div>;
}
