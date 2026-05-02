import uuid
import time

class DetectionEngine:
    def __init__(self):
        self.rules = [
            {"id": "RULE-001", "name": "Idle Compute", "threshold": 5.0, "metric": "cpu_utilization"},
            {"id": "RULE-002", "name": "Unused Storage", "threshold": 0.0, "metric": "iops"},
            {"id": "RULE-003", "name": "Zombie Load Balancer", "threshold": 0, "metric": "request_count"}
        ]

    def scan_resources(self, resources):
        waste = []
        for res in resources:
            utilization = res.get("metrics", {}).get("cpu", 100)
            if utilization < 5.0:
                waste.append({
                    "resource_id": res["id"],
                    "type": res["type"],
                    "issue": "IDLE_COMPUTE",
                    "utilization": utilization,
                    "estimated_savings": res.get("cost", 0) * 0.8,
                    "carbon_impact": res.get("cost", 0) * 0.05 # Mock CO2e kg
                })
        return waste

class RemediationEngine:
    def propose_action(self, waste_item):
        issue = waste_item["issue"]
        if issue == "IDLE_COMPUTE":
            return "STOP_INSTANCE"
        if issue == "UNUSED_STORAGE":
            return "DELETE_SNAPSHOT"
        return "NOTIFY_OWNER"

    def execute_remediation(self, resource_id, action):
        # Simulated execution
        return {
            "execution_id": str(uuid.uuid4()),
            "resource_id": resource_id,
            "action": action,
            "status": "SUCCESS",
            "timestamp": time.time()
        }

class FinOpsModeler:
    def calculate_roi(self, current_waste, implementation_cost=5000):
        total_savings = sum(w["estimated_savings"] for w in current_waste)
        return {
            "total_potential_savings": total_savings,
            "implementation_cost": implementation_cost,
            "net_roi": total_savings - implementation_cost,
            "efficiency_gain_pct": 15.4
        }
