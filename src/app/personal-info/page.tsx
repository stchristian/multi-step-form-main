"use client";

import TextInput from "@/app/personal-info/TextInput";
import { Description, Header, StepContent } from "../_components/StepContent";
import { useMultiStepFormContext } from "@/app/SubscriptionMultiStepForm";

export default function PersonalInfo() {
  const { setValue, name, email, phoneNumber, errors } = useMultiStepFormContext();

  return (
    <StepContent>
      <Header>Personal info</Header>
      <Description>Please provide your name, email address, and phone number.</Description>
      <TextInput
        name="name"
        label="Name"
        placeholder="e.g. Stephen King"
        value={name || ""}
        onChange={(v) => setValue("name", v)}
        error={errors.name}
      />
      <TextInput
        name="email"
        label="Email Address"
        placeholder="e.g. stephenking@lorem.com"
        value={email || ""}
        onChange={(v) => setValue("email", v)}
        error={errors.email}
      />
      <TextInput
        name="phoneNumber"
        label="Phone Number"
        placeholder="e.g. +1 234 567 890"
        value={phoneNumber || ""}
        onChange={(v) => setValue("phoneNumber", v)}
        error={errors.phoneNumber}
      />
    </StepContent>
  );
}
