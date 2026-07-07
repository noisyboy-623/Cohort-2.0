"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "../context/authContext";

const RegisterPage = () => {
  let router = useRouter();
  let { hydrateUser } = useAuth();
  const [formData, setFormData] = useState({});
  console.log(formData);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await api.post("/api/auth/register", formData);
      hydrateUser();
    } catch (error) {
      console.log("Error in registration", error);
    }
  };

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl">Create Account</CardTitle>
          <CardDescription>Register to start shopping.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                onChange={handleChange}
                id="name"
                type="text"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                onChange={handleChange}
                id="password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <Button className="w-full">Register</Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
