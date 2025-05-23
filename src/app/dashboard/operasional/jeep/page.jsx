// "use client";
// import { useState } from "react";
// import Sidebar from "/components/Sidebar.jsx";
// import UserMenu from "/components/Pengguna.jsx";
// import SearchInput from "/components/Search.jsx";
// import withAuth from "/src/app/lib/withAuth";
// import { useRouter } from "next/navigation";
// import { Trash2 } from "lucide-react";

// const dummyData = [
//   {
//     lambung: "01",
//     plat: "AB1",
//     kapasitas: "4 Orang",
//     status: "Tersedia",
//     action: "Lihat Detail",
//   },
//   {
//     lambung: "02",
//     plat: "AB2",
//     kapasitas: "4 Orang",
//     status: "Tersedia",
//     action: "Lihat Detail",
//   },
//   {
//     lambung: "03",
//     plat: "AB3",
//     kapasitas: "4 Orang",
//     status: "Tersedia",
//     action: "Lihat Detail",
//   },
//   {
//     lambung: "04",
//     plat: "AB4",
//     kapasitas: "4 Orang",
//     status: "Tersedia",
//     action: "Lihat Detail",
//   },
// ];

// const PenjadwalanPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const router = useRouter();

//   const filteredData = dummyData.filter(
//     (item) =>
//       item.plat.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.kapasitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAturJadwal = (id) => {
//     router.push(`/dashboard/anggota`); //belom piks
//   };

//   return (
//     <div className="flex">
//       <UserMenu />
//       <Sidebar />
//       <div className="flex-1 p-6">
//         <h1 className="text-[32px] font-semibold mb-6 text-black">
//           Daftar Jeep
//         </h1>

//         <div className="flex justify-end mb-7">
//           <SearchInput
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onClear={() => setSearchTerm("")}
//             placeholder="Cari"
//           />
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full table-auto">
//             <thead className="text-gray-500">
//               <tr>
//                 <th className="p-2 text-center font-normal">No. Lambung</th>
//                 <th className="p-2 text-center font-normal">Plat</th>
//                 <th className="p-2 text-center font-normal">Kapasitas</th>
//                 <th className="p-2 text-center font-normal">Status</th>
//                 <th className="p-2 text-center font-normal">Aksi</th>
//                 <th className="p-2 text-center font-normal">Hapus Jeep</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.length > 0 ? (
//                 filteredData.map((item) => (
//                   <tr
//                     key={item.lambung}
//                     className="border-t border-[#808080] hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="p-2 text-center text-gray-750">
//                       {item.lambung}
//                     </td>
//                     <td className="p-2 text-center text-gray-750">
//                       {item.plat}
//                     </td>
//                     <td className="p-2 text-center text-gray-750">
//                       {item.kapasitas}
//                     </td>
//                     <td className="p-2 text-center text-gray-750">
//                       {item.status}
//                     </td>
//                     <td className="p-2 text-center">
//                       <button
//                         onClick={() => handleAturJadwal(item.id)}
//                         className="w-[120px] bg-[#B8D4F9] rounded-[10px] text-[#1C7AC8] py-1 px-3 cursor-pointer hover:bg-[#7ba2d0] transition"
//                       >
//                         {item.action}
//                       </button>
//                     </td>
//                     <td className="text-center">
//                       <button
//                         className="text-gray-500 hover:text-gray-700 cursor-pointer"
//                         onClick={() => console.log("Hapus", item.id)}
//                         title="Hapus"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="p-4 text-center text-gray-500">
//                     Data tidak ditemukan.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default withAuth(PenjadwalanPage);


"use client";
import { useState } from "react";
import Sidebar from "/components/Sidebar.jsx";
import UserMenu from "/components/Pengguna.jsx";
import SearchInput from "/components/Search.jsx";
import TambahJeep from "/components/TambahJeep";
import withAuth from "/src/app/lib/withAuth";
import { useRouter } from "next/navigation";
import { Trash2, Plus } from "lucide-react";

const dummyData = [
  {
    lambung: "01",
    plat: "AB1",
    kapasitas: "4 Orang",
    status: "Tersedia",
    action: "Lihat Detail",
  },
  {
    lambung: "02",
    plat: "AB2",
    kapasitas: "4 Orang",
    status: "Tersedia",
    action: "Lihat Detail",
  },
  {
    lambung: "03",
    plat: "AB3",
    kapasitas: "4 Orang",
    status: "Tersedia",
    action: "Lihat Detail",
  },
  {
    lambung: "04",
    plat: "AB4",
    kapasitas: "4 Orang",
    status: "Tersedia",
    action: "Lihat Detail",
  },
];

const JeepPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modeTambah, setModeTambah] = useState(false); // Menambahkan state untuk modeTambah
  const router = useRouter();

  const filteredData = dummyData.filter(
    (item) =>
      item.plat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kapasitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAturJadwal = (lambung) => {
    router.push(`/dashboard/anggota/${lambung}`); // Menggunakan lambung untuk navigasi
  };

  const handleKembali = () => {
    setModeTambah(false);
  };

  const handleTambahJeep = () => {
    setModeTambah(true);
  };

  return (
    <div className="flex">
      <UserMenu />
      <Sidebar />
      <div className="flex-1 p-6">
        {modeTambah ? (
          <TambahJeep onKembali={handleKembali} />
        ) : (
          <>
            <h1 className="text-[32px] font-semibold mb-6 text-black">
              Daftar Jeep
            </h1>

            <div className="flex">
              <button
                onClick={handleTambahJeep}
                className="bg-[#1C7AC8] rounded-[10px] text-white py-1 px-3 mt-2 cursor-pointer hover:bg-[#7ba2d0] transition flex items-center"
              >
                <Plus size={18} className="mr-2 w-[20px] h-auto" />
                Tambah Jeep
              </button>
            </div>

            <div className="flex justify-end mb-7">
              <SearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClear={() => setSearchTerm("")}
                placeholder="Cari"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="text-gray-500">
                  <tr>
                    <th className="p-2 text-center font-normal">No. Lambung</th>
                    <th className="p-2 text-center font-normal">Plat</th>
                    <th className="p-2 text-center font-normal">Kapasitas</th>
                    <th className="p-2 text-center font-normal">Status</th>
                    <th className="p-2 text-center font-normal">Aksi</th>
                    <th className="p-2 text-center font-normal">Hapus Jeep</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <tr
                        key={item.lambung}
                        className="border-t border-[#808080] hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-2 text-center text-gray-750">
                          {item.lambung}
                        </td>
                        <td className="p-2 text-center text-gray-750">
                          {item.plat}
                        </td>
                        <td className="p-2 text-center text-gray-750">
                          {item.kapasitas}
                        </td>
                        <td className="p-2 text-center text-gray-750">
                          {item.status}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => handleAturJadwal(item.lambung)} 
                            className="w-[120px] bg-[#B8D4F9] rounded-[10px] text-[#1C7AC8] py-1 px-3 cursor-pointer hover:bg-[#7ba2d0] transition"
                          >
                            {item.action}
                          </button>
                        </td>
                        <td className="text-center">
                          <button
                            className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={() => console.log("Hapus", item.lambung)} 
                            title="Hapus"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-gray-500">
                        Data tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withAuth(JeepPage);
