/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PhaseItem {
  id: number;
  title: string;
  goal: string;
  mentorMemo: string;
  content: string;
  code?: string;
  language?: string;
  keyTakeaways: string[];
}

export const phases1to5: PhaseItem[] = [
  {
    id: 1,
    title: "Business Understanding",
    goal: "Establish abstract, problem statement, business objectives, KPIs, and questions.",
    mentorMemo: "In Fortune 500 companies, a data project never starts with coding. It starts with aligning with business stake-holders. You must first master the business model: how Superstore sells, where margin leakage occurs, and what leaders care about.",
    content: `### 1. Project Abstract
This project delivers an industry-grade Business Sales Performance and Profitability Analytics solution based on the classic **Superstore Dataset**. By analyzing multi-dimensional factors—such as geography, category, pricing, sub-categories, customer segments, and discount matrices—this work converts raw historical trade logs into a high-impact BI asset. It bridges traditional descriptive reporting with predictive forecasting to drive sustainable growth.

### 2. Problem Statement
Despite experiencing healthy top-line sales growth, the retail superstore encounters significant **geographic and product-specific profitability leakage**. Inactive customer segments, high-volume furniture items with excessive discounting (over 30%), and high shipping overheads in specific regions (e.g., South/Central) frequently erode raw sales margins. Corporate stakeholders lack an integrated, drill-down executive pipeline to diagnose these leakages, evaluate category performance, and predict sales trends for proactive inventory management.

### 3. Business Objectives
* **Identify Growth Drivers**: Uncover top-performing category-region combinations.
* **Diagnose Margin Loss**: Pinpoint exactly which discount rates, customer segments, or products are destroying value.
* **Forecast Inventory Demand**: Project sales for the next quarter to optimize supply chains.
* **Career Portfolio ready**: Deliver a structured, ATS-compliant, recruiter-certified analyst portfolio piece.

### 4. Key Performance Indicators (KPIs)
* **Total Sales (Revenue)**: Raw top-line transaction value.
* **Total Profit (Net Revenue)**: Overall bottom-line performance.
* **Net Profit Margin (%)**: Profit divided by Sales. Ideal target: >12%.
* **Average Order Value (AOV)**: Total sales divided by total order volume.
* **Average Discount Rate (%)**: Evaluation of pricing integrity.
* **Customer Lifetime Sales**: Identifies valuable customer classes.`,
    keyTakeaways: [
      "Always start with the 'Why', not the 'How'.",
      "KPIs must directly connect to commercial actions (e.g., stopping unprofitable discount thresholds).",
      "Define success criteria before cleaning any data."
    ]
  },
  {
    id: 2,
    title: "Project Structure",
    goal: "Design a professional, production-ready GitHub repository blueprint.",
    mentorMemo: "Hiring managers look at your repository structure to see if you write organized, clean code. A flat directory with a single messy notebook signals an amateur. A modular structure signals that you are ready for a professional data team.",
    content: `### Directory Architecture For GitHub Portfolio
Below is the standard layout utilized in enterprise data science and business analytics teams. It separates raw data from processed runs, isolates notebooks for experimentation, and structures clean source code (\`.py\`) for pipeline modularity.

\`\`\`bash
Business-Sales-Analytics/
│
├── data/
│   ├── raw/                 # Original, untouched CSV/XLSX logs
│   └── processed/           # Filtered, cleaned, type-converted parquet/csv
│
├── notebooks/
│   └── 01_eda_and_kpis.ipynb # Sandbox for initial exploration & correlation matrices
│
├── src/                     # Core operational production script files
│   ├── __init__.py
│   ├── data_cleaning.py     # Functions for data loading & type normalization
│   ├── eda.py               # Statistical profiling and distribution checks
│   ├── visualization.py     # Production-grade Matplotlib/Seaborn renders
│   └── forecasting.py       # ARIMA / Holt-Winters time-series models
│
├── reports/                 # Executive summaries, PDF briefings, & memos
│├── dashboard/               # Power BI templates (.pbix) and layout graphics
│├── presentation/           # Client-facing slide deck files (.pptx or PDF)
│├── images/                 # Exported PNGs for README markdown display
│├── README.md               # Extensive comprehensive markdown file
│└── requirements.txt        # Exact frozen module versions
\`\`\`

### Role of Each Folder
* **\`data/raw/\`**: Sacred ground. Never modify raw files. Any modification happens programmatically and saves to processed.
* **\`src/\`**: Highly modular code which can be re-run on fresh monthly data dumps.
* **\`notebooks/\`**: Left as draft scripts to show recruiters your raw thought processes and iterative analysis.`,
    keyTakeaways: [
      "Never commit secrets, API keys, or raw gigabyte datasets to Git repositories.",
      "Always document your repository via requirements.txt for reproducible builds.",
      "Separating exploratory code from production scripts demonstrates senior developer hygiene."
    ]
  },
  {
    id: 3,
    title: "Data Cleaning",
    goal: "Create a modular, idempotent Python pipeline for robust data preprocessing.",
    mentorMemo: "Over 80% of an analyst's time is spent preparing data. If you feed bad data into beautiful charts or machine learning models, the output is useless. We write clean, self-documenting Pandas code with explicit typecasting and logging.",
    code: `import pandas as pd
import numpy as np
import logging

# Configure executive-level logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def run_cleaning_pipeline(raw_path: str, output_path: str) -> pd.DataFrame:
    """
    Modular, enterprise-grade data cleaning pipeline for the Superstore Sales Dataset.
    """
    logging.info("Starting cleaning pipeline for path: %s", raw_path)
    
    # 1. Load Dataset
    try:
        df = pd.read_csv(raw_path)
    except FileNotFoundError:
        # Fallback to excel if needed
        df = pd.read_excel(raw_path)
    
    initial_rows = len(df)
    logging.info("Loaded dataset containing %d records.", initial_rows)
    
    # 2. Check for Duplicate Records
    duplicate_count = df.duplicated(subset=['Order ID', 'Product ID']).sum()
    if duplicate_count > 0:
        df.drop_duplicates(subset=['Order ID', 'Product ID'], keep='first', inplace=True)
        logging.info("Removed %d duplicate row-key constraints.", duplicate_count)
        
    # 3. Handle Missing Values
    # Check nulls
    nulls = df.isnull().sum()
    logging.info("Null report:\n%s", nulls[nulls > 0])
    
    # Custom filling strategies
    if 'Postal Code' in df.columns:
        df['Postal Code'] = df['Postal Code'].fillna("00000").astype(str)
        
    # 4. Data Type Conversion & Normalization
    date_cols = ['Order Date', 'Ship Date']
    for col in date_cols:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors='coerce')
            
    # Ensure numerical columns are non-string and rounded
    numeric_cols = ['Sales', 'Quantity', 'Discount', 'Profit']
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0.0)
            
    # Round metrics for financial standard alignment
    df['Sales'] = df['Sales'].round(2)
    df['Profit'] = df['Profit'].round(2)
    df['Discount'] = df['Discount'].round(4)
    df['Quantity'] = df['Quantity'].astype(int)
    
    # 5. Outlier Detection/Tagging via Interquartile Range (IQR) for Profit
    q75, q25 = np.percentile(df['Profit'], [75 ,25])
    iqr = q75 - q25
    lower_bound = q25 - (1.5 * iqr)
    upper_bound = q75 + (1.5 * iqr)
    df['Is_Profit_Outlier'] = ~df['Profit'].between(lower_bound, upper_bound)
    
    # 6. High-Impact Feature Engineering
    logging.info("Executing tactical feature engineering...")
    df['Order_Year'] = df['Order Date'].dt.year
    df['Order_Month'] = df['Order Date'].dt.month
    df['Order_Quarter'] = df['Order Date'].dt.quarter
    df['Order_Month_Name'] = df['Order Date'].dt.strftime('%B')
    df['Order_Year_Month'] = df['Order Date'].dt.to_period('M')
    
    # Calculate Unit Price and Profit Margin per sale
    df['Unit_Price'] = (df['Sales'] / df['Quantity']).round(2)
    df['Net_Profit_Margin'] = np.where(df['Sales'] > 0, (df['Profit'] / df['Sales']).round(4), 0.0)
    
    # Store the cleaned output
    df.to_csv(output_path, index=False)
    logging.info("Cleaned file written. Row count: %d (reduction: %d rows)", len(df), (initial_rows - len(df)))
    
    return df

if __name__ == "__main__":
    # Example invocation
    # df_cleaned = run_cleaning_pipeline("data/raw/superstore.csv", "data/processed/superstore_cleaned.csv")
    pass
`,
    language: "python",
    content: `### Steps Explained Chronologically:
1. **Idempotence and Logging**: Configures clear, professional logs using standard software engineering principles rather than simple \`print\` statement loops.
2. **Duplicate Deduplication**: Isolates unique rows by analyzing \`Order ID\` and \`Product ID\` indices. This detects transaction glitches where identical orders were double-tallied.
3. **Painless DateTime Casting**: Converts dates into structured datetime objects to enable smooth index sorting, aggregations, and year-month feature extracts.
4. **Outlier Tagging (The 1.5x IQR Rule)**: Rather than dropping outliers (which are highly valid in sales datasets—such as multi-thousand dollar bulky corporate server runs), we tag them as true outliers so they can be isolated or included during calculations.
5. **Net Profit Margin and Feature Engineering**: Automatically extracts Year, Quarter, Month, and Year-Month keys, simplifying subsequent analytical trend splits.`,
    keyTakeaways: [
      "Never drop sales data outliers blindly; they represent large key commercial wins.",
      "Parquet/CSV output should always have pre-defined strict rounding parameters (e.g. 2 decimals for currencies).",
      "Always log the before-and-after row changes of a cleaning pipeline."
    ]
  },
  {
    id: 4,
    title: "Exploratory Data Analysis",
    goal: "Conduct structural statistical profiling and identify core correlation clusters.",
    mentorMemo: "EDA is about digging into the raw signals of your business. Your goal is to find where the numbers act weirdly. Why does Central Region have high sales but negative margins? Let's write robust Seaborn code which uncovers these friction points.",
    code: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

def perform_eda(df_path: str):
    df = pd.read_csv(df_path)
    
    # 1. Dataset Shape & Metadata Profile
    print(f"=== DATASET CONFIGURATION ===")
    print(f"Rows: {df.shape[0]} | Columns: {df.shape[1]}")
    print(df.info())
    
    # 2. Descriptive Summary Statistics
    print("\n=== SUMMARY STATISTICS ===")
    print(df[['Sales', 'Quantity', 'Discount', 'Profit', 'Net_Profit_Margin']].describe())
    
    # 3. Categorical Contribution Breakdown
    print("\n=== REGIONAL MARGIN LEAKAGE SUMMARY ===")
    regional_leakage = df.groupby('Region')[['Sales', 'Profit']].sum()
    regional_leakage['Net_Margin %'] = (regional_leakage['Profit'] / regional_leakage['Sales']) * 100
    print(regional_leakage.round(2))
    
    # 4. Correlation Analysis
    corr_matrix = df[['Sales', 'Quantity', 'Discount', 'Profit']].corr()
    print("\n=== CORRELATION MATRIX ===")
    print(corr_matrix.round(3))
    
    # 5. Dynamic Plots Visualization Setup (Seaborn + Matplotlib)
    plt.style.use('seaborn-v0_8-whitegrid')
    fig, axes = plt.subplots(2, 2, figsize=(15, 12))
    
    # Sales vs. Profit scatter colored by Discount rate
    sns.scatterplot(data=df, x='Sales', y='Profit', hue='Discount', palette='viridis', ax=axes[0,0])
    axes[0,0].set_title('Financial Relationship: Sales vs. Profit by Discount Rate', fontsize=12)
    
    # Profit Distribution
    sns.histplot(df['Profit'], bins=50, kde=True, color='teal', ax=axes[0,1])
    axes[0,1].set_title('Bottom-Line Distribution Profile', fontsize=12)
    axes[0,1].set_yscale('log') # Log scale helps view extremely rare outlier records
    
    # Profit Margins across major segments
    sns.boxplot(data=df, x='Segment', y='Profit', palette='Set2', ax=axes[1,0])
    axes[1,0].set_ylim(-1000, 1000)
    axes[1,0].set_title('Product Profitability Bands across Segment', fontsize=12)
    
    # Aggregated regional category bar splits
    category_summary = df.groupby(['Region', 'Category'])['Sales'].sum().reset_index()
    sns.barplot(data=category_summary, x='Region', y='Sales', hue='Category', palette='muted', ax=axes[1,1])
    axes[1,1].set_title('Revenue Dispersal by Region & Core Category', fontsize=12)
    
    plt.tight_layout()
    plt.savefig('images/eda_profiling_grid.png', dpi=150)
    print("\nSuccess: Profile plot outputs rendered and saved locally as PNGs.")

if __name__ == "__main__":
    # perform_eda("data/processed/superstore_cleaned.csv")
    pass
`,
    language: "python",
    content: `### Deep Executive Interpretations & Findings:
* **The Discount Friction**: The numerical correlation check reveals a **strong negative correlation** between \`Discount\` and \`Profit\` (\~ -0.22). This proves that while discounts increase top-line volumes slightly, they severely destroy profit margins.
* **Profit Distribution Skew**: The profit margin distribution displays high log-scale leptokurtic distribution, meaning standard transactions are clustered closely around small margins while a few corporate orders yield extreme high-magnitude spikes.
* **The Furniture Trap**: The geographical cross-tabs reveal that while Furniture drives high volumes, it suffers from a global net profit margin of around 2-4% due to bulky shipping freight fees and promotional price-cuts.`,
    keyTakeaways: [
      "Use log scales on axes for visual integrity when dealing with highly skewed variables.",
      "Expose correlation metrics to find relationships you can model mathematically.",
      "Analyze multi-dimensional matrices (Region + Category) rather than simple isolated bars."
    ]
  },
  {
    id: 5,
    title: "KPI Development",
    goal: "Formulate metrics that drive business accountability and executive alignment.",
    mentorMemo: "KPI definition is where standard analysts fall short. Executives don't want a long list of random numbers. They want structured business levers: the top margins, the average items per order, the performance delta. Here are the true formulas you must deploy.",
    code: `import pandas as pd
import numpy as np

def calculate_executive_kpis(df: pd.DataFrame) -> dict:
    """
    Formulate precise metrics directly mapped to Fortune 500 retail dashboards.
    """
    total_sales = df['Sales'].sum()
    total_profit = df['Profit'].sum()
    
    # Financial Margins
    aggregate_margin = (total_profit / total_sales) * 100 if total_sales > 0 else 0.0
    
    # Order Metrics
    total_orders = df['Order ID'].nunique()
    avg_order_value = total_sales / total_orders if total_orders > 0 else 0.0
    total_quantity = df['Quantity'].sum()
    avg_items_per_order = total_quantity / total_orders if total_orders > 0 else 0.0
    
    # Discount Integrity
    weighted_avg_discount = (df['Discount'] * df['Sales']).sum() / total_sales * 100
    
    # Customer Concentration KPI
    customer_concentration = (df.groupby('Customer Name')['Sales'].sum().sort_values(ascending=False).head(10).sum() / total_sales) * 100
    
    # Product Tail End KPI
    total_products = df['Product ID'].nunique()
    unprofitable_products_count = df.groupby('Product Name')['Profit'].sum().loc[lambda x: x < 0].count()
    unprofitable_product_ratio = (unprofitable_products_count / total_products) * 100
    
    kpi_report = {
        "Total Revenue ($)": round(total_sales, 2),
        "Total Net Profit ($)": round(total_profit, 2),
        "Corporate Net Margin (%)": round(aggregate_margin, 2),
        "Order Count": total_orders,
        "Average Order Value ($)": round(avg_order_value, 2),
        "Average items/Order": round(avg_items_per_order, 2),
        "Weighted Discount Rate (%)": round(weighted_avg_discount, 2),
        "Top-10 Customer Concentration (%)": round(customer_concentration, 2),
        "Unprofitable Product Ratio (%)": round(unprofitable_product_ratio, 2)
    }
    
    return kpi_report
`,
    language: "python",
    content: `### Executive KPI Formulas Explained:
1. **Corporate Net Margin (%)**: Calculated as \`(Net Profit / Gross Revenue) * 100\`. This metric measures how much of every dollar of sales actually makes it to the company's bottom-line.
2. **Weighted Discount Rate (%)**: Standard average of the discount column is misleading because a 50% discount on a $10 pen has negligible impact compared to a 20% discount on a $5,000 corporate table. We formulate the *Weighted Average* in Python and DAX to represent true economic loss.
3. **Unprofitable Product Ratio (%)**: Displays the health of the SKU lineup. If over 15% of your product catalog yields negative profit overall, it indicates high manufacturing/warehousing costs or systemic deep-discount policies. This dictates product retirement initiatives.`,
    keyTakeaways: [
      "Always favor weighted metrics over flat column averages for financial integrity.",
      "Track customer cohort concentration to avoid over-reliance on a few bulky commercial clients.",
      "Structure your metrics to directly inspire targeted corrective commercial operations."
    ]
  }
];
