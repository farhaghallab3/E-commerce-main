"use client";
import React, { useState, useEffect } from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { getLoggedUserCart } from "@/lib/Services/cart";
import { usePathname } from "next/navigation";

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const result = parts.pop();
    return result ? result.split(';').shift() : null;
  }
  return null;
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const pathname = usePathname();

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: getLoggedUserCart,
    enabled: isLoggedIn, 
  });

  const cart = cartData?.data?.products ?? [];

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = getCookie('token');
      const isAuthenticated = !!token;
      setIsLoggedIn(isAuthenticated);
      
      if (isAuthenticated) {
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken.name) {
          setUserName(decodedToken.name);
        } else {
          setUserName("User");
        }
      } else {
        setUserName("");
      }
    };

    checkAuthStatus();
    const intervalId = setInterval(checkAuthStatus, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    setUserName("");
    setIsMobileMenuOpen(false);
    window.location.href = "/";
  };

  const isActiveLink = (path: string) => {
    return pathname === path;
  };

  return (
    <HeroNavbar
      position="static"
      className="bg-gray-200 px-4 py-2 relative z-50"
    >
      <NavbarBrand className="flex items-center gap-2">
        <i className="fa-solid fa-cart-shopping text-2xl text-teal-400"></i>
        <p className="font-bold text-2xl">Fresh Cart</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link 
            color="foreground" 
            href="/"
            className={`font-bold ${isActiveLink("/") ? "text-blue-600" : "text-gray-700"}`}
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link 
            color="foreground" 
            href="/products"
            className={`font-bold ${isActiveLink("/products") ? "text-blue-600" : "text-gray-700"}`}
          >
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link 
            color="foreground" 
            href="/categories"
            className={`font-bold ${isActiveLink("/categories") ? "text-blue-600" : "text-gray-700"}`}
          >
            Categories
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link 
            color="foreground" 
            href="/brands"
            className={`font-bold ${isActiveLink("/brands") ? "text-blue-600" : "text-gray-700"}`}
          >
            Brands
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Desktop Actions */}
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link href="/wishList">
            <i className="fa-regular fa-heart text-xl"></i>
          </Link>
        </NavbarItem>

        <NavbarItem>
          <div className="relative">
            <Link href="/cart">
              <i className="fa-solid fa-cart-plus text-xl"></i>
            </Link>
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </NavbarItem>

        {isLoggedIn ? (
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" className="flex items-center gap-2">
                  <i className="fa-regular fa-user text-xl"></i>
                  <span className="hidden md:inline">{userName}</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu">
  
                <DropdownItem key="orders" textValue="My Orders">
                  <Link href="/allorders" className="w-full flex items-center">
                    <i className="fa-solid fa-list-check mr-2"></i>
                    My Orders
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                  textValue="Logout"
                  className="flex items-center"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" className="flex items-center gap-2">
                  <i className="fa-regular fa-user text-xl"></i>
                  <span className="hidden md:inline">Account</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Account menu">
                <DropdownItem key="login" textValue="Login">
                  <Link href="/login" className="w-full flex items-center">
                    <i className="fa-solid fa-right-to-bracket mr-2"></i>
                    Login
                  </Link>
                </DropdownItem>
               
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Mobile Menu Button */}
      <div className="sm:hidden flex items-center ml-auto z-50">
        <Button
          size="sm"
          variant="bordered"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className="fa-solid fa-bars"></i>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden z-50 absolute top-full left-0 w-full bg-gray-200 shadow-md flex flex-col gap-2 p-4">
          {/* Cart and Wishlist at the top */}
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/wishList" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex flex-col items-center">
                <i className="fa-regular fa-heart text-2xl mb-1"></i>
                <span className="text-xs">Wishlist</span>
              </div>
            </Link>

            <div className="relative">
              <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex flex-col items-center">
                  <i className="fa-solid fa-cart-plus text-2xl mb-1"></i>
                  <span className="text-xs">Cart</span>
                </div>
              </Link>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <Link
            href="/"
            className={`py-2 px-3 hover:bg-gray-300 rounded font-bold ${isActiveLink("/") ? "text-blue-600" : "text-gray-700"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`py-2 px-3 hover:bg-gray-300 rounded font-bold ${isActiveLink("/products") ? "text-blue-600" : "text-gray-700"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/categories"
            className={`py-2 px-3 hover:bg-gray-300 rounded font-bold ${isActiveLink("/categories") ? "text-blue-600" : "text-gray-700"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Categories
          </Link>
          <Link
            href="/brands"
            className={`py-2 px-3 hover:bg-gray-300 rounded font-bold ${isActiveLink("/brands") ? "text-blue-600" : "text-gray-700"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Brands
          </Link>

          {/* Profile and Orders Section */}
          {isLoggedIn ? (
            <>
              <div className="border-t border-gray-300 my-2 pt-2">
                <p className="text-sm font-semibold text-gray-500 px-3 mb-1">My Account</p>
                
                <Link
                  href="/allorders"
                  className={`py-2 px-3 hover:bg-gray-300 rounded font-bold ${isActiveLink("/allorders") ? "text-blue-600" : "text-gray-700"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className="fa-solid fa-list-check mr-2"></i>
                  My Orders
                </Link>
              </div>
              <Button
                size="sm"
                color="danger"
                variant="flat"
                onClick={handleLogout}
                className="flex items-center gap-2 justify-start mt-2"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Logout
              </Button>
            </>
          ) : (
            <div className="border-t border-gray-300 my-2 pt-2">
              <p className="text-sm font-semibold text-gray-500 px-3 mb-1">Account</p>
              <Link
                href="/login"
                className={`py-2 px-3 hover:bg-gray-300 rounded font-bold ${isActiveLink("/login") ? "text-blue-600" : "text-gray-700"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fa-solid fa-right-to-bracket mr-2"></i>
                Login
              </Link>
              
            </div>
          )}
        </div>
      )}
    </HeroNavbar>
  );
}