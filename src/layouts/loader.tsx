import loader from "../assets/images/loader.svg";

export default function Loader() {
  return (
    <div>
      <img src={loader} alt="Loading..." className="mx-auto mt-32" />
    </div>
  );
}
