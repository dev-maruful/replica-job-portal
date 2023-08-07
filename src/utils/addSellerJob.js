const addSellerJob = (data) => {
  let sellerJobs = JSON.parse(localStorage.getItem("sellerJobs")) || [];

  sellerJobs.push(data);

  // save job to local storage
  localStorage.setItem("sellerJobs", JSON.stringify(sellerJobs));
  return { message: "Job posted successfully", status: "success" };
};

export default addSellerJob;
