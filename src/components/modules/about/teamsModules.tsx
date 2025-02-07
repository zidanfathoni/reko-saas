"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import LoadingComponents from "@/components/atoms/loading";
import { Connections } from "@/config";
import { api } from "@/lib/axios/instance";
import { DataProfileTeam, GetProfileTeam } from "@/lib/interface/profile/profile-team";
import { Loader2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

const people = [
  {
    id: "person-1",
    name: "Name",
    role: "Role",
    avatar: "https://shadcnblocks.com/images/block/avatar-1.webp",
  },
  {
    id: "person-2",
    name: "Name",
    role: "Role",
    avatar: "https://shadcnblocks.com/images/block/avatar-2.webp",
  },
  {
    id: "person-3",
    name: "Name",
    role: "Role",
    avatar: "https://shadcnblocks.com/images/block/avatar-3.webp",
  },
  {
    id: "person-4",
    name: "Name",
    role: "Role",
    avatar: "https://shadcnblocks.com/images/block/avatar-4.webp",
  },
  {
    id: "person-5",
    name: "Name",
    role: "Role",
    avatar: "https://shadcnblocks.com/images/block/avatar-5.webp",
  },
  {
    id: "person-6",
    name: "Name",
    role: "Role",
    avatar: "https://shadcnblocks.com/images/block/avatar-6.webp",
  },
  {
    id: "person-7",
    name: "Name",
    role: "Role",
    avatar: "https://shadcnblocks.com/images/block/avatar-7.webp",
  },
  {
    id: "person-8",
    name: "Name",
    role: "Role",
    avatar: "https://shadcnblocks.com/images/block/avatar-8.webp",
  },
];

const TeamsModules: React.FC = () => {
  const [data, setData] = useState<DataProfileTeam>();
  const [loading, setLoading] = useState<boolean>(true);
  const [emptyData, setEmptyData] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<GetProfileTeam>(`/profile-team`, {
          headers: {
            'Content-Type': 'application/json',
          },
        }); // ganti '/endpoint' dengan endpoint yang sesuai
        setData(response.data.data);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <section className="pb-32">
      <div className="container flex flex-col items-center text-center">
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
          Meet our team
        </h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">
          Get to know the talented individuals behind Receh Koding. Our team of skilled developers, designers, and innovators is dedicated to delivering top-notch solutions and driving success for your projects. Together, we bring your ideas to life!
        </p>
      </div>
      {loading && (
        <LoadingComponents />
      )}
      <div className="container mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
        <Suspense
          fallback={<Loader2 className="h-16 w-16 animate-spin text-primary" />}>
          {data?.attributes.users_permissions_users.data.map((person) => (
            <div key={person.id} className="flex flex-col items-center">
              <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
                <AvatarImage src={person.attributes.avatar.data.attributes.url} />
                <AvatarFallback>{person.attributes.avatar.data.attributes.name}</AvatarFallback>
              </Avatar>
              <p className="text-center font-medium">{person.attributes.username}</p>
              <p className="text-center text-muted-foreground">{person.attributes.job_title}</p>
            </div>
          ))}
        </Suspense>
      </div>
    </section>
  );
};

export default TeamsModules;
