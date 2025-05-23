"use client";
import { useState, useRef, useEffect } from "react";
import Sidebar from "/components/Sidebar.jsx";
import UserMenu from "/components/Pengguna.jsx";
import withAuth from "/src/app/lib/withAuth";
import {
  CalendarDays,
  FileText,
  FileSpreadsheet,
  PlusCircle,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TriwulanPage = () => {
  const [dataTriwulan, setDataTriwulan] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    idLaporan: "",
    idPemasukan: "",
    idPengeluaran: "",
    pengeluaran: "",
    jumlahJeep: "",
    hariTanggal: "",
    operasional: "",
    operasionalBersih: "",
    kas: "",
  });
  const calendarRef = useRef(null);

  const exampleData = [
    {
      idLaporan: 1,
      idPemasukan: 101,
      idPengeluaran: 201,
      pengeluaran: "Rp 500.000",
      jumlahJeep: 5,
      hariTanggal: "12/01/2025",
      operasional: "Rp 2.000.000",
      operasionalBersih: "Rp 1.500.000",
      kas: "Rp 1.200.000",
    },
    {
      idLaporan: 2,
      idPemasukan: 102,
      idPengeluaran: 202,
      pengeluaran: "Rp 700.000",
      jumlahJeep: 6,
      hariTanggal: "12/02/2025",
      operasional: "Rp 2.500.000",
      operasionalBersih: "Rp 1.800.000",
      kas: "Rp 1.500.000",
    },
  ];

  useEffect(() => {
    setDataTriwulan(exampleData);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDataTriwulan([...dataTriwulan, formData]);
    setShowFormModal(false);
    setFormData({
      idLaporan: "",
      idPemasukan: "",
      idPengeluaran: "",
      pengeluaran: "",
      jumlahJeep: "",
      hariTanggal: "",
      operasional: "",
      operasionalBersih: "",
      kas: "",
    });
  };

  return (
    <div className="flex relative bg-blue-50 min-h-screen">
      <UserMenu />
      <Sidebar />
      <div className="flex-1 p-6 relative">
        <h1 className="text-4xl font-semibold mb-6 text-blue-600">Triwulan</h1>

        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex gap-4 items-center">
                            {/* Pilih Tanggal */}
                            <div className="relative">
                              <button
                                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                                className="flex items-center gap-2 bg-blue-600 text-black-600 hover:bg-blue-200 px-4 py-2 rounded-lg shadow"
                              >
                                <CalendarDays size={24} />
                                <span className="text-base font-medium">
                                  {selectedDate
                                    ? selectedDate.toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                      })
                                    : "Pilih Tanggal"}
                                </span>
                              </button>
                              {isDatePickerOpen && (
                                <div
                                  ref={calendarRef}
                                  className="absolute z-50 mt-2 bg-white border rounded-lg shadow-lg p-4 top-12"
                                >
                                  <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    inline
                                    dateFormat="dd/MM/yyyy"
                                    showPopperArrow={false}
                                  />
                                  {/* Button Pilih dan Batal */}
                                  <div className="mt-4 flex justify-between">
                                    <button
                                      onClick={() => setIsDatePickerOpen(false)}
                                      className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400"
                                    >
                                      Batal
                                    </button>
                                    <button
                                      onClick={() => handleDateChange(selectedDate)}
                                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                      Pilih Tanggal
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

            {/* Tombol Tambah */}
            <button
              onClick={() => setShowFormModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-black hover:bg-blue-700 px-4 py-2 rounded-lg shadow"
            >
              <PlusCircle size={20} />
              Tambah
            </button>
          </div>

          {/* Tombol Export */}
          <div className="flex gap-4 justify-end">
            <button className="flex items-center gap-2 bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-lg shadow">
              <FileSpreadsheet size={18} color="green" />
              <span className="text-base font-medium text-black">
                Export Excel
              </span>
            </button>
            <button className="flex items-center gap-2 bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-lg shadow">
              <FileText size={18} color="red" />
              <span className="text-base font-medium text-black">
                Export PDF
              </span>
            </button>
          </div>
        </div>

        {/* Tabel */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-blue-600">
              Laporan Triwulan
            </h2>
            <button className="text-blue-600 hover:text-blue-800 text-base font-medium">
              Lihat Semua
            </button>
          </div>

          <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">ID Laporan</th>
                <th className="p-3 text-left">ID Pemasukan (PK)</th>
                <th className="p-3 text-left">ID Pengeluaran</th>
                <th className="p-3 text-left">Pengeluaran</th>
                <th className="p-3 text-left">Jumlah Jeep</th>
                <th className="p-3 text-left">Hari / Tanggal</th>
                <th className="p-3 text-left">Operasional</th>
                <th className="p-3 text-left">Operasional Bersih</th>
                <th className="p-3 text-left">Kas</th>
              </tr>
            </thead>
            <tbody>
              {dataTriwulan.map((item, index) => (
                <tr key={index} className="border-b hover:bg-blue-50">
                  <td className="p-3">{item.idLaporan}</td>
                  <td className="p-3">{item.idPemasukan}</td>
                  <td className="p-3">{item.idPengeluaran}</td>
                  <td className="p-3">{item.pengeluaran}</td>
                  <td className="p-3">{item.jumlahJeep}</td>
                  <td className="p-3">{item.hariTanggal}</td>
                  <td className="p-3">{item.operasional}</td>
                  <td className="p-3">{item.operasionalBersih}</td>
                  <td className="p-3">{item.kas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Data */}
      {showFormModal && (
        <div className="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">
              Tambah Laporan Triwulan
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-6">
                {Object.keys(formData).map((key) => (
                  <div key={key}>
                    <label className="block mb-2 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(TriwulanPage);
