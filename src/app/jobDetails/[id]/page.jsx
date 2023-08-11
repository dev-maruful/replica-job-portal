"use client";

import GetAllSellerJobs from "@/utils/getAllSellerJobs";
import { usePathname } from "next/navigation";

const JobDetailsPage = () => {
  const router = usePathname();
  const jobId = router.split("/")[2];
  const { data: allJobs } = GetAllSellerJobs();
  const currentJob = allJobs.find((job) => job.photo.includes(jobId));
  console.log(currentJob);

  return <div>hello</div>;
};

export default JobDetailsPage;
