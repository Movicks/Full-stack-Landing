// import React from 'react'

type Props = {
  title: string;
  description: string;
};

export default function FormHeader({ title, description }: Props) {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="text-4xl font-bold text-red-500">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
