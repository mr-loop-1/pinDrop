export default function Register() {
  const onSubmit = async (data) => {
    const auth = {
      name: data.name,
      email: data.email,
      password: data.password,
      slug: slug,
    };
    try {
      const res = await registerUser(auth);
      dispatch(setUser(res));
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/");
    } catch (err) {}
  };

  return <div className=""></div>;
}
