import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Table } from "../components/ui/table";
import { Dialog } from "../components/ui/dialog";

export default function DashboardPage() {
  const data = [
    { Name: "Salt", Price: 50, Stock: "Yes" },
    { Name: "Sugar", Price: 30, Stock: "No" },
  ];

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>Products</CardHeader>
        <CardContent>
          <Table columns={["Name", "Price", "Stock"]} data={data} />
        </CardContent>
      </Card>

      <Dialog title="Add Product" triggerText="Add New Product">
        <p>Form goes here...</p>
        <Button className="mt-2">Submit</Button>
      </Dialog>
    </div>
  );
}
