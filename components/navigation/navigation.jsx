"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { ToolBar } from "../toolbar/toolbar";
import { SingIn } from "../sign-in/sign-in";


export function Navigation() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">Царский КирпичЪ</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
          <ToolBar />
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <SingIn />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
