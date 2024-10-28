output "cluster_id" {
  value = aws_eks_cluster.nodejs-app.id
}

output "node_group_id" {
  value = aws_eks_node_group.nodejs-app.id
}

output "vpc_id" {
  value = aws_vpc.nodejs-app_vpc.id
}

output "subnet_ids" {
  value = aws_subnet.nodejs-app_subnet[*].id
}
