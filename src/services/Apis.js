import { commonrequest } from "./ApiCall";
import { BASE_URL } from "./helper";

export const registerfunc = async (data, header) => {
  return await commonrequest("POST", `${BASE_URL}/user/register`, data, header);
};

export const userGetFunction = async (search, page) => {
  return await commonrequest(
    "GET",
    `${BASE_URL}/user/details?search=${search}&page=${page}`,
    ""
  );
};

export const singleUserGetFunction = async (id) => {
  return await commonrequest("GET", `${BASE_URL}/user/${id}`, "");
};

export const editFunction = async (id, data, header) => {
  return await commonrequest(
    "PUT",
    `${BASE_URL}/user/edit/${id}`,
    data,
    header
  );
};

export const deleteFunction = async (id) => {
  return await commonrequest("DELETE", `${BASE_URL}/user/delete/${id}`, {});
};

export const statusChangeFunction = async (id, data) => {
  return await commonrequest("PUT", `${BASE_URL}/user/status/${id}`, { data });
};

export const exporttoCsvFunction = async () => {
  return await commonrequest("GET", `${BASE_URL}/userexport`, "");
};
