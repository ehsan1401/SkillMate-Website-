
type AlertType = "success" | "info" | "warning" | "error";

interface AlertState {
  message: string;
  type: AlertType;
  visible: boolean;
}
