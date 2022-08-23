import { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function Alert() {
  const { alert } = useContext(AlertContext);

  return (
    alert !== null && (
      <p className=" mb-4 space-x-2">
        {alert.type === "error" && (
          <FontAwesomeIcon style={{ color: "orange" }} icon={faCircleXmark} />
        )}

        <strong>{alert.msg}</strong>
      </p>
    )
  );
}

export default Alert;
