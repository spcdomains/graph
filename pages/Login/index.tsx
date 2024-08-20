import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import { useRouter } from "next/router";

const Index = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/home");
    }
  }, [router]);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/home");
    }

    const handlePopState = () => {
      router.push("/home");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const loginResponse = await axios.post(
        "https://www.referback.trollsufficient.com/admin/login",
        { email, password }
      );
      const { token, role } = loginResponse.data;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("role", role);

      const userResponse = await axios.post(
        "https://www.referback.trollsufficient.com/admin/user",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const userName = userResponse.data.name;
      const userId = userResponse.data.id;
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId);

      const coinsResponse = await axios.get(
        `https://www.referback.trollsufficient.com/admin/coins/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const userCoins = coinsResponse.data.coins;
      localStorage.setItem("userCoins", userCoins.toString());
      window.location.reload()
      router.push("/home");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <div className={styles.loginForm}>
        {/* <h1 className={styles.header}>Login First to View User Details and Message Us</h1> */}
        <h2 className={styles.loginTitle}>LOGIN</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="current-username"
            />
            <label>User Id</label>
            <div className={styles.inputUnderline}></div>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <label>Password</label>
            <div className={styles.inputUnderline}></div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.button_login}>
            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
