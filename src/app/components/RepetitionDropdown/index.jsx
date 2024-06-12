"use client";

export default function RepetitionDropdown({ onChange, value, className }) {
  return (
    <div>
      <select
        value={value}
        onChange={onChange}
        className={className}
        name="select"
        required
      >
        <option value="Diariamente">Diariamente</option>
        <option value="3 vezes por semana">3 vezes por semana</option>
        <option value="2 vezes por semana">2 vezes por semana</option>
        <option value="Semanalmente">Semanalmente</option>
        <option value="Quinzenalmente">Quinzenalmente</option>
        <option value="Mensalmente">Mensalmente</option>
      </select>
    </div>
  );
}
