

/**
 * Represents the type of alert to display.
 * - `"info"`: Informational message.
 * - `"success"`: Indicates a successful operation.
 * - `"warning"`: Warns about a potential issue.
 * - `"error"`: Indicates an error or problem.
 */
export type AlertType = "info" | "success" | "warning" | "error";

/**
 * Represents the available CSS classes for different alert types.
 * - "alert-info": Used for informational alerts.
 * - "alert-success": Used for success alerts.
 * - "alert-warning": Used for warning alerts.
 * - "alert-error": Used for error alerts.
 */
export type AlertClasse = "alert-info" | "alert-success" | "alert-warning" | "alert-error";

/**
 * Renders an alert component with a specific type and icon.
 *
 * @param children - The content to display inside the alert.
 * @param alertType - The type of alert to display. Determines the styling and icon.
 * 
 * Supported alert types:
 * - `info`: Informational alert.
 * - `success`: Success alert.
 * - `warning`: Warning alert.
 * - `error`: Error alert.
 *
 * The component displays an appropriate SVG icon and applies corresponding CSS classes
 * based on the `alertType` prop.
 *
 * @returns A styled alert box containing an icon and the provided children.
 */
export default function Alert({ children, alertType }: { children: React.ReactNode, alertType: AlertType }) {

  // Define a mapping of alert types to their corresponding classes
  const alertClasses: Record<AlertType, AlertClasse> = {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
  };

  // Get the class for the provided alert type
  const alertClass: AlertClasse = alertClasses[alertType];

  // Define the SVG icon based on the alert type
  const alertIcon = alertClass === "alert-info" ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  ) : alertClass === "alert-success" ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) : alertClass === "alert-warning" ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ) : ( // alert-error
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )

  // Render the alert component
  return (
    <div role="alert" className={`alert ${alertClass}`}>
      {alertIcon}
      <span>{children}</span>
    </div>
  );

}