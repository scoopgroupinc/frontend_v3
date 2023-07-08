import { useEffect } from "react";
import axios from "axios";
import { URLS } from "../utils/constants/apis";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUserId, setUserVisuals } from "../store/features/user/userSlice";

export const useGetUserVisuals = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  useEffect(() => {
    const getVisuals = async () => {
      axios
        .get(`${URLS.FILE_URL}/api/v1/visuals/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        })
        .then((res) => {
          dispatch(
            setUserVisuals({
              userVisuals: res.data,
            })
          );
        })
        .catch(() => {});
    };
    getVisuals();
  }, [userId, dispatch]);

  //   const getVisuals = async () => {
  //     await fetch(`${URLS.FILE_URL}/api/v1/visuals/${userId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then(async (res) => {
  //         if (res && !Boolean(visuals.length)) {
  //           setDisplayPhoto(res[0]?.videoOrPhoto)
  //           const ratingInput: any = []
  //           res.forEach(async (visual: any) => {
  //             const find = contentIds.find(
  //               (rd: any) => rd.contentId === visual.id && rd.type === 'user_visual'
  //             )
  //             if (!find) {
  //               ratingInput.push({
  //                 contentId: visual.id,
  //                 type: 'user_visual',
  //               })
  //             }
  //           })
  //           setContentIds((prev: any) => [...prev, ...ratingInput])
  //           setVisuals(res)
  //           dispatch(
  //             setAllImages({
  //               allImages: res,
  //             })
  //           )
  //         }
  //       })
  //       .catch((err) => {})
  //   }
  return [];
};
