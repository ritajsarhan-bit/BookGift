// BookGift Admin Dashboard Components
// Stats cards, charts, recent activity tables for the admin panel

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiBook, FiShoppingBag, FiUsers, FiDollarSign, FiTrendingUp, FiEye, FiEdit, FiTrash2, FiPlus, FiRefreshCw, FiDownload } from 'react-icons/fi';

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface StatCard {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
  link?: string;
}

interface RecentOrder {
  id: string;
  user: string;
  email: string;
  total: number;
  status: string;
  date: string;
  items: number;
}

interface RecentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  joined: string;
  orders: number;
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────

export function StatCard({ title, value, change, changeType = 'neutral', icon, color, link }: StatCard) {
  const changeColors = {
    up: 'text-green-600 bg-green-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50',
  };

  const content = (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
        {change && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${changeColors[changeType]}`}>
            {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : '→'} {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );

  if (link) {
    return <Link href={link} className="block">{content}</Link>;
  }
  return content;
}

// ─── STATS GRID ───────────────────────────────────────────────────────────────

interface AdminStatsGridProps {
  stats?: {
    totalBooks?: number;
    totalOrders?: number;
    totalUsers?: number;
    totalRevenue?: number;
  };
}

export function AdminStatsGrid({ stats = {} }: AdminStatsGridProps) {
  const cards: StatCard[] = [
    {
      title: 'Total Books',
      value: stats.totalBooks ?? 0,
      change: '12 this month',
      changeType: 'up',
      icon: <FiBook className="text-blue-600" size={22} />,
      color: 'bg-blue-50',
      link: '/admin/books',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders ?? 0,
      change: '8% this week',
      changeType: 'up',
      icon: <FiShoppingBag className="text-purple-600" size={22} />,
      color: 'bg-purple-50',
      link: '/admin/orders',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers ?? 0,
      change: '3 today',
      changeType: 'up',
      icon: <FiUsers className="text-green-600" size={22} />,
      color: 'bg-green-50',
      link: '/admin/users',
    },
    {
      title: 'Total Revenue',
      value: `$${(stats.totalRevenue ?? 0).toFixed(2)}`,
      change: '15% this month',
      changeType: 'up',
      icon: <FiDollarSign className="text-amber-600" size={22} />,
      color: 'bg-amber-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, i) => <StatCard key={i} {...card} />)}
    </div>
  );
}

// ─── RECENT ORDERS TABLE ──────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PAID: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

interface RecentOrdersTableProps {
  orders?: RecentOrder[];
  loading?: boolean;
}

export function RecentOrdersTable({ orders = [], loading = false }: RecentOrdersTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="font-bold text-gray-900">Recent Orders</h2>
        <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
          View all <FiTrendingUp size={14} />
        </Link>
      </div>

      {loading ? (
        <div className="p-8 space-y-3">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="bg-gray-200 h-4 rounded flex-1" />
              <div className="bg-gray-200 h-4 rounded w-24" />
              <div className="bg-gray-200 h-4 rounded w-16" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="p-12 text-center">
          <div className="text-4xl mb-3">📦</div>
          <p className="text-gray-500">No orders yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-600">{order.id.slice(0, 8)}...</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order.user}</div>
                    <div className="text-xs text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.items}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[order.status] || 'bg-gray-100 text-gray-600'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{order.date}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-800">
                      <FiEye size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── RECENT USERS TABLE ───────────────────────────────────────────────────────

interface RecentUsersTableProps {
  users?: RecentUser[];
  loading?: boolean;
}

export function RecentUsersTable({ users = [], loading = false }: RecentUsersTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="font-bold text-gray-900">Recent Users</h2>
        <Link href="/admin/users" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
          View all <FiUsers size={14} />
        </Link>
      </div>

      {loading ? (
        <div className="p-8 space-y-3">
          {[1,2,3,4].map((i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="bg-gray-200 h-4 rounded-full w-8 h-8" />
              <div className="bg-gray-200 h-4 rounded flex-1" />
              <div className="bg-gray-200 h-4 rounded w-20" />
            </div>
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="p-12 text-center">
          <div className="text-4xl mb-3">👥</div>
          <p className="text-gray-500">No users yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['User', 'Email', 'Role', 'Orders', 'Joined', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user.role === 'ADMIN' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.orders}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{user.joined}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <button className="text-blue-600 hover:text-blue-800"><FiEye size={15} /></button>
                    <button className="text-gray-500 hover:text-gray-700"><FiEdit size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN ACTIONS BAR ────────────────────────────────────────────────────────

interface AdminActionsBarProps {
  title: string;
  onAdd?: () => void;
  onRefresh?: () => void;
  onExport?: () => void;
  addLabel?: string;
  loading?: boolean;
}

export function AdminActionsBar({ title, onAdd, onRefresh, onExport, addLabel = 'Add New', loading = false }: AdminActionsBarProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <div className="flex items-center gap-3">
        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 px-4 py-2 rounded-xl transition-colors"
          >
            <FiDownload size={16} /> Export
          </button>
        )}
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
          >
            <FiRefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        )}
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-2 text-sm bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <FiPlus size={16} /> {addLabel}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── CONFIRM DELETE DIALOG ────────────────────────────────────────────────────

interface ConfirmDeleteProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
}

export function ConfirmDelete({ open, onConfirm, onCancel, title = 'Delete Item', message = 'Are you sure you want to delete this item? This action cannot be undone.', loading = false }: ConfirmDeleteProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
        <div className="text-center mb-5">
          <div className="text-5xl mb-4">🗑️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 text-sm">{message}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <><FiRefreshCw size={14} className="animate-spin" /> Deleting...</> : <><FiTrash2 size={14} /> Delete</>}
          </button>
        </div>
      </div>
    </div>
  );
}
