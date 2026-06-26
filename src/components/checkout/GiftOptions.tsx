'use client';

import { useState } from 'react';

export interface GiftData {
  isGift: boolean;
  giftWrapping: boolean;
  giftMessage: string;
  wrappingStyle: string;
  wrappingColor: string;
  ribbonColor: string;
  giftCardDesign: string;
}

export const defaultGiftData: GiftData = {
  isGift: false,
  giftWrapping: false,
  giftMessage: '',
  wrappingStyle: '',
  wrappingColor: '',
  ribbonColor: '',
  giftCardDesign: '',
};

const WRAPPING_STYLES = ['Classic', 'Elegant', 'Birthday', 'Minimal', 'Luxury'];
const WRAPPING_COLORS = ['Red', 'Blue', 'Gold', 'Silver', 'Green', 'Black', 'White'];
const RIBBON_COLORS = ['Red', 'Gold', 'Silver', 'Blue', 'Black', 'White'];
const CARD_DESIGNS = ['Simple', 'Birthday', 'Thank You', 'Congratulations', 'Romantic'];

const COLOR_SWATCHES: Record<string, string> = {
  Red: 'bg-red-500',
  Blue: 'bg-blue-500',
  Gold: 'bg-yellow-400',
  Silver: 'bg-gray-300',
  Green: 'bg-green-500',
  Black: 'bg-gray-900',
  White: 'bg-white border border-gray-300',
};

const STYLE_ICONS: Record<string, string> = {
  Classic: '🎁',
  Elegant: '✨',
  Birthday: '🎂',
  Minimal: '📦',
  Luxury: '👑',
};

const CARD_ICONS: Record<string, string> = {
  Simple: '📄',
  Birthday: '🎂',
  'Thank You': '🙏',
  Congratulations: '🎊',
  Romantic: '💝',
};

const MAX_MESSAGE = 300;

interface Props {
  value: GiftData;
  onChange: (data: GiftData) => void;
  errors: { wrappingStyle?: string; wrappingColor?: string; giftMessage?: string };
}

export default function GiftOptions({ value, onChange, errors }: Props) {
  const update = (patch: Partial<GiftData>) => onChange({ ...value, ...patch });

  const remaining = MAX_MESSAGE - value.giftMessage.length;

  return (
    <div className="card p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">🎁 Gift Options</h2>

      {/* Is Gift */}
      <label className="flex items-center gap-3 cursor-pointer select-none mb-4">
        <input
          type="checkbox"
          checked={value.isGift}
          onChange={(e) => update({ isGift: e.target.checked, giftWrapping: false })}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="font-medium text-gray-800">This order is a gift</span>
      </label>

      {value.isGift && (
        <div className="space-y-5 pl-1">
          {/* Gift Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gift Message <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={value.giftMessage}
              onChange={(e) => {
                if (e.target.value.length <= MAX_MESSAGE)
                  update({ giftMessage: e.target.value });
              }}
              placeholder="Write a personal message for the recipient..."
              rows={3}
              className={`input resize-none ${errors.giftMessage ? 'border-red-400' : ''}`}
            />
            <div className="flex justify-between mt-1">
              {errors.giftMessage ? (
                <p className="text-xs text-red-500">{errors.giftMessage}</p>
              ) : <span />}
              <p className={`text-xs ${remaining < 30 ? 'text-red-500' : 'text-gray-400'}`}>
                {remaining} characters remaining
              </p>
            </div>
          </div>

          {/* Add Gift Wrapping */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={value.giftWrapping}
              onChange={(e) => update({ giftWrapping: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="font-medium text-gray-800">Add gift wrapping</span>
          </label>

          {value.giftWrapping && (
            <div className="space-y-5 border-l-2 border-blue-100 pl-4">

              {/* Wrapping Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wrapping Style <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {WRAPPING_STYLES.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => update({ wrappingStyle: style })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all ${
                        value.wrappingStyle === style
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <span>{STYLE_ICONS[style]}</span>
                      {style}
                    </button>
                  ))}
                </div>
                {errors.wrappingStyle && (
                  <p className="text-xs text-red-500 mt-1">{errors.wrappingStyle}</p>
                )}
              </div>

              {/* Wrapping Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wrapping Color <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {WRAPPING_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => update({ wrappingColor: color })}
                      title={color}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all ${
                        value.wrappingColor === color
                          ? 'ring-2 ring-blue-500 ring-offset-1 border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full inline-block ${COLOR_SWATCHES[color]}`} />
                      {color}
                    </button>
                  ))}
                </div>
                {errors.wrappingColor && (
                  <p className="text-xs text-red-500 mt-1">{errors.wrappingColor}</p>
                )}
              </div>

              {/* Ribbon Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ribbon Color <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {RIBBON_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => update({ ribbonColor: value.ribbonColor === color ? '' : color })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all ${
                        value.ribbonColor === color
                          ? 'ring-2 ring-blue-500 ring-offset-1 border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full inline-block ${COLOR_SWATCHES[color]}`} />
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gift Card Design */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gift Card Design <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {CARD_DESIGNS.map((design) => (
                    <button
                      key={design}
                      type="button"
                      onClick={() => update({ giftCardDesign: value.giftCardDesign === design ? '' : design })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all ${
                        value.giftCardDesign === design
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <span>{CARD_ICONS[design]}</span>
                      {design}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview Card */}
              {(value.wrappingStyle || value.wrappingColor) && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">Preview</p>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{value.wrappingStyle ? STYLE_ICONS[value.wrappingStyle] : '🎁'}</div>
                    <div className="text-sm space-y-0.5">
                      {value.wrappingStyle && (
                        <p className="text-gray-700"><span className="font-medium">Style:</span> {value.wrappingStyle}</p>
                      )}
                      {value.wrappingColor && (
                        <p className="text-gray-700 flex items-center gap-1.5">
                          <span className="font-medium">Wrap:</span>
                          <span className={`w-3 h-3 rounded-full inline-block ${COLOR_SWATCHES[value.wrappingColor]}`} />
                          {value.wrappingColor}
                        </p>
                      )}
                      {value.ribbonColor && (
                        <p className="text-gray-700 flex items-center gap-1.5">
                          <span className="font-medium">Ribbon:</span>
                          <span className={`w-3 h-3 rounded-full inline-block ${COLOR_SWATCHES[value.ribbonColor]}`} />
                          {value.ribbonColor}
                        </p>
                      )}
                      {value.giftCardDesign && (
                        <p className="text-gray-700"><span className="font-medium">Card:</span> {CARD_ICONS[value.giftCardDesign]} {value.giftCardDesign}</p>
                      )}
                    </div>
                  </div>
                  {value.giftMessage && (
                    <p className="mt-2 text-xs text-gray-500 italic border-t border-blue-100 pt-2">
                      "{value.giftMessage}"
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
