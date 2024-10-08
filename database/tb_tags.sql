-- DROP TABLE public.tb_tags;
CREATE TABLE public.tb_tags (
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    code character varying(100) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    link character varying(255) COLLATE pg_catalog."default" NOT NULL,
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default" NOT NULL,
    note text COLLATE pg_catalog."default",
    status integer DEFAULT 1,
    maker_id bigint NOT NULL,
    maker_date timestamp without time zone,
    language_id bigint DEFAULT 0,
    CONSTRAINT tb_tags_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

ALTER TABLE
    public.tb_tags OWNER to postgres;

COMMENT ON COLUMN public.tb_tags.id IS 'Số sequence';

COMMENT ON COLUMN public.tb_tags.status_code IS 'trạng thái đường dẫn';

COMMENT ON COLUMN public.tb_tags.link IS 'link cần chuyển tiếp';

COMMENT ON COLUMN public.tb_tags.link_redirect IS 'Link chuyển tiếp';

COMMENT ON COLUMN public.tb_tags.status IS 'Tình trạng dữ liệu: 1: Active, 0: Inactive';

COMMENT ON COLUMN public.tb_tags.maker_id IS 'Người tạo';

COMMENT ON COLUMN public.tb_tags.maker_date IS 'Ngày tạo';