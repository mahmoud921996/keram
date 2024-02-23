import request from "@/config/axios";

export function updateToggle({ name, id }) {
  const formData = new FormData();
  formData.append("Id", id)
  return request({
    url: `/${name}`,
    method: "put",
    data: formData
  });
}
