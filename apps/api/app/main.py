from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from core.detection.engine import DetectionEngine, RemediationEngine, FinOpsModeler

app = FastAPI(title="Waste Reduction Automation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

detection = DetectionEngine()
remediation = RemediationEngine()
finops = FinOpsModeler()

# Mock Resource DB
MOCK_RESOURCES = [
    {"id": "i-0a2b3c4d", "type": "EC2", "cost": 450, "metrics": {"cpu": 2.1}},
    {"id": "i-9z8y7x6w", "type": "EC2", "cost": 120, "metrics": {"cpu": 45.5}},
    {"id": "vol-5v4u3t2s", "type": "EBS", "cost": 85, "metrics": {"cpu": 0.0}},
    {"id": "alb-1k2j3h4g", "type": "ALB", "cost": 35, "metrics": {"cpu": 0.0}}
]

@app.get("/health")
def health():
    return {"status": "ok", "service": "waste-reduction-automation"}

@app.get("/resources")
def list_resources():
    return {"resources": MOCK_RESOURCES}

@app.get("/dashboard/summary")
def get_summary():
    waste = detection.scan_resources(MOCK_RESOURCES)
    stats = finops.calculate_roi(waste)
    return {
        "waste_count": len(waste),
        "total_savings": stats["total_potential_savings"],
        "carbon_reduction_kg": sum(w["carbon_impact"] for w in waste),
        "efficiency_score": 84.6
    }

@app.post("/detect")
def run_detection():
    waste = detection.scan_resources(MOCK_RESOURCES)
    return {"detected_waste": waste}

@app.post("/remediate")
def execute_action(data: dict = Body(...)):
    resource_id = data.get("resource_id")
    action = data.get("action", "STOP_INSTANCE")
    result = remediation.execute_remediation(resource_id, action)
    return result

@app.get("/metrics")
def get_metrics():
    return {
        "active_scans": 4,
        "remediation_success_rate": 0.985,
        "average_waste_age_days": 12.4
    }
