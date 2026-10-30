export const siteConfig = {
  name: "Muhammad Hamza Siddiqui",
  shortName: "Hamza Siddiqui",
  role: "Cloud Data & AI Engineer",
  tagline: "I turn raw data into intelligent, production-ready AI systems.",
  subTagline:
    "Cloud Data & AI Engineer · AWS · Snowflake · Airflow · Karachi, Pakistan",
  availability: "Open to roles & consulting",
  email: "m.hamzasiddiqui22@gmail.com",
  github: "https://github.com/Muhammad-Hamza69",
  linkedin: "https://www.linkedin.com/in/muhammad-hamza-386a36306/",
  location: "Karachi, Pakistan",
};

export const stats = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 65, suffix: "%", label: "Latency Reduction" },
  { value: 35, suffix: "%", label: "Faster Processing" },
  { value: 50, suffix: "%", label: "Query Boost" },
];

export const howIWork = [
  {
    step: "01",
    title: "Ingest",
    description:
      "Real-time streams and batch ingestion from any source — Kinesis, Kafka, Glue, IoT Core, REST APIs.",
  },
  {
    step: "02",
    title: "Transform",
    description:
      "Clean, model, and enrich data with dbt, PySpark, and SQL — medallion architecture from raw to gold.",
  },
  {
    step: "03",
    title: "Store",
    description:
      "Optimized warehousing in Snowflake, Databricks, or SQL Server — designed for analytical workloads.",
  },
  {
    step: "04",
    title: "Deliver",
    description:
      "Analytics dashboards, AI-ready datasets, and automated reporting that stakeholders actually use.",
  },
];

export const expertise = {
  dataEngineering: {
    title: "Data Engineering",
    description:
      "End-to-end pipeline ownership — from raw ingestion to analytics-ready data marts.",
    skills: [
      "ETL / ELT Pipelines",
      "Real-time Streaming",
      "Data Warehousing",
      "Star Schema Modeling",
      "CDC Replication",
      "Data Quality & Governance",
    ],
  },
  cloudAI: {
    title: "AI & Cloud",
    description:
      "Cloud-native architectures on AWS, with AI/ML integrations using LLMs, RAG, and LangChain.",
    skills: [
      "AWS (Lambda, Glue, Kinesis, DMS)",
      "Serverless Architectures",
      "LLMs & RAG Pipelines",
      "LangChain & OpenAI",
      "Infrastructure as Code",
      "CI/CD & Docker",
    ],
  },
};

export const techStack = [
  { name: "Python", category: "language" },
  { name: "SQL", category: "language" },
  { name: "AWS", category: "cloud" },
  { name: "Snowflake", category: "platform" },
  { name: "Apache Airflow", category: "orchestration" },
  { name: "dbt", category: "transformation" },
  { name: "Kafka", category: "streaming" },
  { name: "Databricks", category: "platform" },
  { name: "PySpark", category: "processing" },
  { name: "Docker", category: "infrastructure" },
  { name: "Terraform", category: "infrastructure" },
  { name: "LangChain", category: "ai" },
  { name: "OpenAI", category: "ai" },
  { name: "RAG", category: "ai" },
  { name: "AWS Glue", category: "cloud" },
  { name: "Kinesis", category: "streaming" },
];

export const projects = [
  {
    title: "E-commerce Data Engineering Pipeline",
    metric: "Real-time at scale",
    metricDetail: "Sub-second ingestion across millions of events",
    description:
      "End-to-end real-time pipeline that ingests e-commerce transaction events via AWS Kinesis, orchestrates transformation with Apache Airflow (MWAA), and loads analytics-ready data into Snowflake. Built for high-volume, fault-tolerant workloads.",
    tags: ["Python", "AWS Kinesis", "Airflow", "Snowflake", "MWAA"],
    github: "https://github.com/Muhammad-Hamza69/ecommerce-data-engineering-pipeline",
    highlight: "AWS Kinesis → Airflow → Snowflake",
  },
  {
    title: "Serverless Currency ETL",
    metric: "Hourly automated delivery",
    metricDetail: "Zero-maintenance, event-driven data pipeline",
    description:
      "EventBridge-triggered Lambda fetches live exchange rate data from Open Exchange Rates API every hour. Raw JSON backed up to S3 for disaster recovery, then loaded into a three-tier Snowflake model (RAW → STG → PROCESSED) via stored procedures.",
    tags: ["Python", "AWS Lambda", "EventBridge", "S3", "Secrets Manager", "Snowflake"],
    github: "https://github.com/Muhammad-Hamza69/s3-lambda-eventbridge-snowflake",
    highlight: "EventBridge → Lambda → S3 + Snowflake",
  },
  {
    title: "Modern Data Warehouse (SQL Server)",
    metric: "50% query performance boost",
    metricDetail: "Star Schema over ERP + CRM sources",
    description:
      "Consolidated disparate ERP and CRM CSV sources into a unified, analytics-ready Star Schema on SQL Server. Implemented full ETL scripts, a data quality and cleansing layer, and analytical SQL queries for customer behavior, product performance, and sales trends.",
    tags: ["T-SQL", "SQL Server", "ETL", "Star Schema", "Data Modeling"],
    github: "https://github.com/Muhammad-Hamza69/Data-Warehouse-Project",
    highlight: "ERP/CRM → ETL → Star Schema",
  },
  {
    title: "OLTP to OLAP Migration (MySQL → AWS Cloud)",
    metric: "Full-load + CDC replication",
    metricDetail: "On-premise MySQL migrated to cloud analytics",
    description:
      "Migrated an on-premise MySQL database to a full cloud analytics stack. AWS DMS handles full-load and change-data-capture replication to both RDS and S3. Glue/Spark enriches and transforms data, with Athena for ad-hoc SQL and QuickSight + Grafana for real-time dashboards.",
    tags: [
      "MySQL",
      "AWS DMS",
      "Kinesis Firehose",
      "Lambda",
      "Glue",
      "Athena",
      "QuickSight",
      "Grafana",
    ],
    github: "https://github.com/Muhammad-Hamza69/oltp-to-olap-database-migration",
    highlight: "MySQL → DMS → S3 → Glue → Athena",
  },
];

export const architectures = [
  {
    title: "Real-time E-commerce Pipeline",
    subtitle: "Kinesis → Airflow/MWAA → Snowflake",
    description:
      "High-throughput streaming pipeline designed for millions of e-commerce events per day.",
    diagram: `
  ┌─────────────────────────────────────────────────────┐
  │              E-COMMERCE REAL-TIME PIPELINE           │
  └─────────────────────────────────────────────────────┘

  [Transaction Events]
         │
         ▼
  ┌─────────────┐     ┌──────────────────┐
  │   Kinesis   │────▶│  Kinesis Firehose│
  │  Data Stream│     │  (Buffer + Batch) │
  └─────────────┘     └────────┬─────────┘
                               │
                               ▼
                    ┌──────────────────┐
                    │   Apache Airflow  │
                    │   (AWS MWAA)      │
                    │  ┌─────────────┐  │
                    │  │ Ingest DAG  │  │
                    │  │ Transform   │  │
                    │  │ Load DAG    │  │
                    │  └─────────────┘  │
                    └────────┬──────────┘
                             │
                    ┌────────▼──────────┐
                    │     Snowflake     │
                    │  ┌─────────────┐  │
                    │  │  RAW Layer  │  │
                    │  │  STAGING    │  │
                    │  │  ANALYTICS  │  │
                    │  └─────────────┘  │
                    └───────────────────┘
    `,
  },
  {
    title: "Serverless ETL Architecture",
    subtitle: "EventBridge → Lambda → S3 + Snowflake",
    description:
      "Zero-maintenance serverless pipeline with multi-layer Snowflake data model and S3 backup.",
    diagram: `
  ┌─────────────────────────────────────────────────────┐
  │              SERVERLESS CURRENCY ETL                 │
  └─────────────────────────────────────────────────────┘

  [EventBridge Rule]  ←── Hourly cron trigger
         │
         ▼
  ┌─────────────┐     ┌──────────────────┐
  │  AWS Lambda │────▶│   Open Exchange  │
  │  (Python)   │     │    Rates API     │
  └──────┬──────┘     └──────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
  ┌───┐   ┌──────────────────┐
  │ S3│   │    Snowflake     │
  │Raw│   │ ┌──────────────┐ │
  │   │   │ │  RAW Layer   │ │
  └───┘   │ │  STG Layer   │ │
  (DR)    │ │  PROCESSED   │ │
          │ └──────────────┘ │
          │  Stored Procs    │
          └──────────────────┘

  Secrets Manager ──▶ Lambda (credentials)
    `,
  },
  {
    title: "Modern Data Warehouse",
    subtitle: "ERP/CRM → ETL → Star Schema",
    description:
      "Multi-source data warehouse consolidating ERP and CRM systems into a unified analytics model.",
    diagram: `
  ┌─────────────────────────────────────────────────────┐
  │           MODERN DATA WAREHOUSE ARCHITECTURE         │
  └─────────────────────────────────────────────────────┘

  ┌──────────┐  ┌──────────┐
  │  ERP CSV │  │  CRM CSV │  ← Source Systems
  └────┬─────┘  └────┬─────┘
       │              │
       └──────┬───────┘
              │
              ▼
  ┌───────────────────────┐
  │     ETL / Cleansing   │
  │  • Null handling      │
  │  • Deduplication      │
  │  • Type casting       │
  └──────────┬────────────┘
             │
             ▼
  ┌───────────────────────┐
  │    Staging Layer      │
  │    (SQL Server)       │
  └──────────┬────────────┘
             │
             ▼
  ┌───────────────────────────────────┐
  │         STAR SCHEMA               │
  │                                   │
  │  [Dim: Customer] [Dim: Product]   │
  │         └──────┬──────┘           │
  │           [Fact: Sales]           │
  │         ┌──────┴──────┐           │
  │  [Dim: Date]  [Dim: Location]     │
  └───────────────────────────────────┘
    `,
  },
  {
    title: "OLTP to OLAP Cloud Migration",
    subtitle: "MySQL → DMS → S3 → Glue → Athena",
    description:
      "Full cloud migration with real-time CDC replication, data lake enrichment, and multi-tool visualization.",
    diagram: `
  ┌─────────────────────────────────────────────────────┐
  │           OLTP → OLAP CLOUD MIGRATION                │
  └─────────────────────────────────────────────────────┘

  [IoT Sensors]
       │
       ▼
  ┌──────────┐    ┌──────────────────┐
  │ AWS IoT  │───▶│ Kinesis Firehose │
  │   Core   │    └────────┬─────────┘
  └──────────┘             │
                           ▼
  ┌──────────┐    ┌─────────────────┐
  │  MySQL   │    │   AWS Lambda    │──▶ MySQL Insert
  │ (EC2/VPC)│    └─────────────────┘
  └────┬─────┘
       │  AWS DMS (Full Load + CDC)
       │
  ┌────┴───────────────┐
  │                    │
  ▼                    ▼
┌──────┐         ┌───────────┐
│  RDS │         │  S3 Raw   │
│MySQL │         │  Bucket   │
└──────┘         └─────┬─────┘
                       │
                       ▼
               ┌──────────────┐
               │  AWS Glue    │
               │  (Spark ETL) │
               │  Enrichment  │
               └──────┬───────┘
                      │
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
      ┌──────────┐      ┌───────────┐
      │ DynamoDB │      │  S3 Gold  │
      │(Metrics) │      │ (Parquet) │
      └────┬─────┘      └─────┬─────┘
           │                  │
           ▼                  ▼
      ┌─────────┐      ┌──────────┐
      │ Grafana │      │  Athena  │──▶ QuickSight
      └─────────┘      └──────────┘
    `,
  },
];

export const certifications = [
  { name: "Introduction to Python", issuer: "DataCamp" },
  { name: "Intermediate Python", issuer: "DataCamp" },
  { name: "Intro & Intermediate SQL", issuer: "DataCamp" },
  { name: "Joining Data in SQL", issuer: "DataCamp" },
  { name: "Understanding Data Engineering", issuer: "DataCamp" },
  { name: "Data Science & Analytics", issuer: "HP Life" },
];

export const recognition = [
  {
    title: "AWS Student Builder Group Leader",
    description:
      "Selected to lead the AWS Student Builder program, mentoring students and driving cloud adoption at university level.",
  },
];

export const experience = [
  {
    company: "Virtuosoft",
    role: "Data Engineer",
    period: "Jan 2026 – May 2026",
    description:
      "Optimized ETL/ELT pipelines end-to-end, reducing data processing latency by 65% — cutting pipeline execution from 60 minutes down to 20 minutes.",
    tags: ["ETL", "ELT", "Pipeline Optimization"],
  },
  {
    company: "Saylani Mass IT",
    role: "Data Engineer",
    period: "Jul 2025 – May 2026",
    description:
      "Migrated legacy batch jobs to incremental, event-driven pipelines using AWS Glue and Lambda, cutting nightly processing time by 35%.",
    tags: ["AWS Glue", "Lambda", "Incremental Pipelines"],
  },
  {
    company: "Aptech",
    role: "Data Engineer",
    period: "Jan 2025 – Dec 2025",
    description:
      "Designed Star Schema data models in Snowflake for reporting use cases, improving dashboard query performance by 50%.",
    tags: ["Snowflake", "Star Schema", "Data Modeling"],
  },
];
