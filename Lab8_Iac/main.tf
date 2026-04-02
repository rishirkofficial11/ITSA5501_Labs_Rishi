terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
  required_version = ">= 1.5.0"
}

provider "azurerm" {
  features {}
  subscription_id = "c8357f68-a484-4013-ba83-f331a9415e58"
}

resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = "canadacentral"
  tags = {
    Environment = "Terraform Getting Started"
    Team        = "DevOps"
  }
}

resource "azurerm_storage_account" "storage" {
  name                     = "itsa55011755982"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  tags = {
    Environment = "Terraform Getting Started"
    Team        = "DevOps"
  }
}

resource "azurerm_storage_container" "container" {
  name                  = "tf-container"
  storage_account_name  = azurerm_storage_account.storage.name
  container_access_type = "private"
}