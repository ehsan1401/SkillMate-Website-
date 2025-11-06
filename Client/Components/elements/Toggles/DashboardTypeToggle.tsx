import { Button } from "antd";
import { useCallback, useEffect, useState } from "react";

type PanelType = "Creator" | "Collaborator";

export default function DashboardTypeToggle() {
  const [panelTypeToggle, setPanelTypeToggle] = useState<PanelType>("Creator");

    useEffect(() => {
    const ptype = localStorage.getItem("Ptype") as PanelType | null;
    setPanelTypeToggle(ptype === "Creator" || ptype === "Collaborator" ? ptype : "Creator");
    }, []);



  const handleChangePanelType = useCallback(() => {
    const newType = panelTypeToggle === "Creator" ? "Collaborator" : "Creator";
    setPanelTypeToggle(newType);
    localStorage.setItem("Ptype", newType);
  }, [panelTypeToggle]);

  return (
    <Button
      type="primary"
      style={{
        backgroundColor: panelTypeToggle === "Collaborator" ? "#fa541c" : "#2f54eb",
      }}
      onClick={handleChangePanelType}
    >
      {panelTypeToggle}
    </Button>
  );
}
