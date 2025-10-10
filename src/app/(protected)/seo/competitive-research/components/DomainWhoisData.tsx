"use client";

interface DomainWhoisDataProps {
  data: any;
}

export default function DomainWhoisData({ data }: DomainWhoisDataProps) {
  if (data.status !== 0) {
    return <p className="text-red-500 mt-4">Invalid or unavailable domain information.</p>;
  }

  return (
    <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-gray-700">
      <div className="space-y-2">
        <p><strong>Domain:</strong> {data.domain_name}</p>
        <p><strong>Registrar:</strong> {data.registrar}</p>
        <p><strong>Country:</strong> {data.country}</p>
        <p><strong>WHOIS Server:</strong> {data.whois_server}</p>
      </div>

      <div className="space-y-2">
        <p><strong>Created:</strong> {data.create_date || "N/A"}</p>
        <p><strong>Updated:</strong> {data.update_date || "N/A"}</p>
        <p><strong>Expires:</strong> {data.expire_date || "N/A"}</p>
        <p><strong>Nameservers:</strong> {data.nameservers?.join(", ")}</p>
      </div>
    </div>
  );
}
