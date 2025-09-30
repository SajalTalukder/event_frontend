import EditEvent from "@/components/Dashboard/EditEvent";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const EditEventPage = async ({ params }: Props) => {
  const id = (await params).id;
  return <EditEvent id={id} />;
};

export default EditEventPage;
