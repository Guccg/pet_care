create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null check (char_length(customer_name) between 1 and 80),
  phone text not null check (phone ~ '^[+\d][\d\s-]{6,19}$'),
  pet_type text not null check (char_length(pet_type) between 1 and 40),
  service_type text not null check (char_length(service_type) between 1 and 60),
  expected_arrival_at timestamp without time zone not null,
  note text not null default '' check (char_length(note) <= 1000),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_expected_arrival_at_idx
  on public.bookings (expected_arrival_at);

create index if not exists bookings_phone_idx
  on public.bookings (phone);

alter table public.bookings enable row level security;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bookings_set_updated_at on public.bookings;

create trigger bookings_set_updated_at
before update on public.bookings
for each row
execute function public.set_updated_at();
