"use client";

import { Store } from "@/db/schema";
import { useState } from "react";
import { TextInputWithLabel } from "../text-input-with-label";
import { Button } from "../ui/button";
import { apiRoutes } from "@/lib/routes";
import { updateStoreDetails } from "@/lib/apiTypes";
import { toast } from "../ui/use-toast";

export const EditStoreFields = ({ storeDetails }: { storeDetails: Store }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] =
    useState<Record<string, unknown>>(storeDetails);

  const handleUpdateDetails = async () => {
    setIsLoading(true);
    const req: updateStoreDetails["input"] = {
      newStoreValues: formValues as Store,
    };
    const res = await fetch(apiRoutes.updateStoreDetails, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    const data: updateStoreDetails["output"] = await res.json();
    setIsLoading(false);
    toast({
      title: data.message,
      description: data.action,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <TextInputWithLabel
        type="text"
        label="Store Name"
        id="name"
        state={formValues}
        setState={setFormValues}
      />
      <TextInputWithLabel
        type="text"
        label="Store Description"
        id="description"
        state={formValues}
        setState={setFormValues}
      />
      <TextInputWithLabel
        type="text"
        label="Industry"
        id="industry"
        state={formValues}
        setState={setFormValues}
      />
      <div className="flex items-center justify-end">
        <Button onClick={handleUpdateDetails} disabled={isLoading}>
          {isLoading ? "Saving" : "Save"}
        </Button>
      </div>
    </div>
  );
};