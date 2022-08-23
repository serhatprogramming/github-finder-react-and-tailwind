import spinner from "./assets/spinner.gif";

function Spinner() {
  return (
    <div className="w-100 mt-20">
      <img
        src={spinner}
        alt="loading..."
        className="text-center mx-auto"
        width={180}
      />
    </div>
  );
}

export default Spinner;
