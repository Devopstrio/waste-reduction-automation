module "waste_ops_network" {
  source = "./modules/networking"

  vpc_cidr = "10.40.0.0/16"
}

module "waste_analysis_cluster" {
  source = "./modules/compute"

  cluster_name = "waste-analysis-hub"
  node_count   = 3
}

module "waste_metadata_db" {
  source = "./modules/database"

  instance_class = "db.t3.medium"
}

resource "kubernetes_namespace" "waste_mgmt" {
  metadata {
    name = "waste-reduction-automation"
  }
}

resource "aws_cloudwatch_event_rule" "waste_scan_schedule" {
  name                = "daily-waste-reduction-scan"
  schedule_expression = "rate(24 hours)"
}

resource "aws_iam_role" "waste_remediator" {
  name = "waste-reduction-remediator-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}
