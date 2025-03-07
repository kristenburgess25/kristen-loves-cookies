PGDMP                         }            baking_blog_db    15.3    15.6 (Homebrew) $    (           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            )           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            *           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            +           1262    24576    baking_blog_db    DATABASE     p   CREATE DATABASE baking_blog_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE baking_blog_db;
                postgres    false            �            1259    24578 
   categories    TABLE     a   CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    24577    categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public          postgres    false    215            ,           0    0    categories_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
          public          postgres    false    214            �            1259    24616    recipe_tags    TABLE     k   CREATE TABLE public.recipe_tags (
    recipe_id character varying NOT NULL,
    tag_id integer NOT NULL
);
    DROP TABLE public.recipe_tags;
       public         heap    postgres    false            �            1259    24599    recipes    TABLE     �  CREATE TABLE public.recipes (
    id character varying NOT NULL,
    title character varying NOT NULL,
    subtitle character varying,
    category_id integer,
    hero_image character varying,
    images jsonb,
    introduction text,
    yield_amount character varying,
    prep_time character varying,
    ingredients jsonb NOT NULL,
    instructions jsonb NOT NULL,
    notes jsonb
);
    DROP TABLE public.recipes;
       public         heap    postgres    false            �            1259    24589    tags    TABLE     [   CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.tags;
       public         heap    postgres    false            �            1259    24588    tags_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.tags_id_seq;
       public          postgres    false    217            -           0    0    tags_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;
          public          postgres    false    216            |           2604    24581    categories id    DEFAULT     n   ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            }           2604    24592    tags id    DEFAULT     b   ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);
 6   ALTER TABLE public.tags ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            !          0    24578 
   categories 
   TABLE DATA           .   COPY public.categories (id, name) FROM stdin;
    public          postgres    false    215   �&       %          0    24616    recipe_tags 
   TABLE DATA           8   COPY public.recipe_tags (recipe_id, tag_id) FROM stdin;
    public          postgres    false    219   �&       $          0    24599    recipes 
   TABLE DATA           �   COPY public.recipes (id, title, subtitle, category_id, hero_image, images, introduction, yield_amount, prep_time, ingredients, instructions, notes) FROM stdin;
    public          postgres    false    218   �'       #          0    24589    tags 
   TABLE DATA           (   COPY public.tags (id, name) FROM stdin;
    public          postgres    false    217   �a       .           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 4, true);
          public          postgres    false    214            /           0    0    tags_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.tags_id_seq', 9, true);
          public          postgres    false    216                       2606    24585    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    215            �           2606    24622    recipe_tags recipe_tags_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.recipe_tags
    ADD CONSTRAINT recipe_tags_pkey PRIMARY KEY (recipe_id, tag_id);
 F   ALTER TABLE ONLY public.recipe_tags DROP CONSTRAINT recipe_tags_pkey;
       public            postgres    false    219    219            �           2606    24605    recipes recipes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_pkey;
       public            postgres    false    218            �           2606    24596    tags tags_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_pkey;
       public            postgres    false    217            �           1259    24586    ix_categories_id    INDEX     E   CREATE INDEX ix_categories_id ON public.categories USING btree (id);
 $   DROP INDEX public.ix_categories_id;
       public            postgres    false    215            �           1259    24587    ix_categories_name    INDEX     P   CREATE UNIQUE INDEX ix_categories_name ON public.categories USING btree (name);
 &   DROP INDEX public.ix_categories_name;
       public            postgres    false    215            �           1259    24615    ix_recipes_category_id    INDEX     Q   CREATE INDEX ix_recipes_category_id ON public.recipes USING btree (category_id);
 *   DROP INDEX public.ix_recipes_category_id;
       public            postgres    false    218            �           1259    24612    ix_recipes_id    INDEX     ?   CREATE INDEX ix_recipes_id ON public.recipes USING btree (id);
 !   DROP INDEX public.ix_recipes_id;
       public            postgres    false    218            �           1259    24613    ix_recipes_introduction    INDEX     S   CREATE INDEX ix_recipes_introduction ON public.recipes USING btree (introduction);
 +   DROP INDEX public.ix_recipes_introduction;
       public            postgres    false    218            �           1259    24611    ix_recipes_subtitle    INDEX     K   CREATE INDEX ix_recipes_subtitle ON public.recipes USING btree (subtitle);
 '   DROP INDEX public.ix_recipes_subtitle;
       public            postgres    false    218            �           1259    24614    ix_recipes_title    INDEX     E   CREATE INDEX ix_recipes_title ON public.recipes USING btree (title);
 $   DROP INDEX public.ix_recipes_title;
       public            postgres    false    218            �           1259    24598 
   ix_tags_id    INDEX     9   CREATE INDEX ix_tags_id ON public.tags USING btree (id);
    DROP INDEX public.ix_tags_id;
       public            postgres    false    217            �           1259    24597    ix_tags_name    INDEX     D   CREATE UNIQUE INDEX ix_tags_name ON public.tags USING btree (name);
     DROP INDEX public.ix_tags_name;
       public            postgres    false    217            �           2606    24623 &   recipe_tags recipe_tags_recipe_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipe_tags
    ADD CONSTRAINT recipe_tags_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);
 P   ALTER TABLE ONLY public.recipe_tags DROP CONSTRAINT recipe_tags_recipe_id_fkey;
       public          postgres    false    219    3468    218            �           2606    24628 #   recipe_tags recipe_tags_tag_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipe_tags
    ADD CONSTRAINT recipe_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id);
 M   ALTER TABLE ONLY public.recipe_tags DROP CONSTRAINT recipe_tags_tag_id_fkey;
       public          postgres    false    217    219    3461            �           2606    24606     recipes recipes_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);
 J   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_category_id_fkey;
       public          postgres    false    215    3455    218            !   /   x�3�t����L-�2�t*JML�2�H,.)	�pz���s��qqq �GH      %   �   x�u�Kn�0D��]�I�w�F&L�)�pN_).�x���΄A��+�aH3�1�u=XNa$�"��ꠒ�\.�w烺�H+r��D�Z�y���M�<��m^
1;�*�y{tcw���򤺢��,^�3��RI��� Z����qV*wb��l�;ľ5{�o��X���h�� /���d�����F��HE��N����u��xMj_��O�)gRT�j�u���s�?���      $      x��}K�W�޺�+R�QU PU$�
/�TsD�2�
�b܋� R��Dg&
W�����#���no'ffQ����/�O����>Y���j2�y���睭�YU�m6����pVUWy�=���z�<��oWY2+Ҧ�g���Ѭ����ly������&�����g�t]m�ϒ7�8M^e�:-���z�m�L�fi&��Y��Fɋd�^g�>k��Jy9OҲ�6k}��O[z��赴I��ي^���v[�MRmۤ���ɛ6+�b����}^.�C��g�:�Bc�:���
�`�˚F6�A�r���|�m��v�Qsu���mZaYU�O��v��W�ʴ��95S��:K�$/�ɰ>;�s�_g����������2�gQ��U=:�\g�|�N�:9;M��^f������j�̶�d�m۬�� ����*��ծ�.�i=H6��*��7h������e�d�e#�Y�l��L��2/�T~��'|����!?YՖ�Wܷ�b��izE;A;4O��T��NeB�Yβ.��χ�k�΋���i��`c��6�L6�W�Œ���`���J�ك�d��A�F�ڐ5��̘�dyyc�D��b�(�l���e�_u������̈��5(9 �Ti�Ʀ.���M]�<�q:��)}Ǥ��du���x��[��4��2�v�lS�_�d��$�c�vwt¨��^�By��`�ޖm^�� ���Z�=X�d۠�,��զHK=:2�z/*z竻�L�x�)�w�|���Q�����|�<����>Ye���)�!�b[��Єft̒t���{U�jp���4�,ki�8�Z�1��Ɓ}a��c
6�\$}L3��|��-͉���<����Yg`��vSd	�I�|�/D_u�/W-��IS�t �9�v�]��j����)�g����?o�?�������t�8:!�5��kڋj�v�iS47� 8���hk::��Q/�ss��clb��&n���Ƈ,!d]��6�HSji[i���d� ��^�d���:�S!-G���q>�0�ЃP`��#o����&����Fh���U�TLͻ�lA�
��p��A!��ᘊ������#�\���������h�  Y��8'K��fyY��.����:�יP>�Ў� |R7��E��$p�1����̟.Z�7U�G������"35�T��W����g��Qe���NR��n���(�V�S�@~�`�IFx`�3$Y�lk�!+�:vZ<:�-�'��Kq�|S�$n�������;�o��Xn�36��p<��%�u[��q��Ă�Bp��zi]]�颮�<�MZ*ת�d`���؆8TC�EX@�H2��C�(��vH7��g�E_�%�VY�a~}�e/<��
|���G�|�D<��C�4)I���%�����`ώ�n[�)Pg1OvՖ��nH^g��ɑ�6 ��@Qq��%@�|��K�sC�]a��}+�w+�`������b1����.��c�r\6;��`�a�n�L��p�=�2�3��yF�3݀�L+^` U"�����^���Фk�y�X�ݖW�ȼZ�ޖ���ģ�<��9	h���^���c�m���v.ԝ���O���;g��-�.@�<b���dY���d:`̍��>yp.|��֛��<����	p�['���&B0~N�X��5-��S�r��[�XU�B=z�yb���8��9��3���c2c/������7Y*�@�Q-F�4[[c��k�$�M��U�<,�.��I��$�E�,Ӝ�7?���w$t�2��s�̗�f���Z��p�_��<!���WQ	�D�A�+��M��cf�:~��D�t�"��u>K��s�njl���"F�^���'��Re��4bLdF��� �sbE��^V���	V��tN �d�����HD'>`�#^�'\��/���M&T��r@� N�|W�N|��(M�[��!��Ա��j���V2T͔ES!X���O}{�5�����[Y&��D5�2�H3;�C@��yU����Ҋ�ڲ^� b@o�AԐI���납m��q#�l���jh�N�Lѿ�]��"�=)��TD�y+$F��ʵ��S�l����Gp~�`��o�C�N��;�`�Z�P�����7��n��u��@��TG;�%��H=�[�7)K`�~�4�h�7M^�e2;�봽�a�1��E)��V�oƼ��E���wbX՚Z��`�줢ҺR]E��m����]+�i�S��x�ȞӖ*�5����5�t@�- Qۗr��qO�c^п��kj��wJ�*�E�bV���8�d&�G{A�uc�>�\�i��;Z�]�=@�
�/W�aCV2N��Z�,\E^''���]����_�2 �����M�B�K�}8P���y��@������#YO,*%ܝ�apX������g��=��Q�}�� �� ������rYdѨ!�i��`�n�JM���k��Y;[�e#�Y\'�����t;��pp��&R�<YB �2_�J����>b��w[d�h��PpUP�~8�VX?��YN[�dh������YL�I����@f2��%�N�͗4��ja�m�iE�]�䳼���0Dd�`�T�|	{��?`h�R����V˙���wܪ�yG��+���;Xў�]>E+��v��i��r��8�;C�i�1P���u���	چ37��˨`b?C���"�X ���a��3/<�Ƭ��=�ﱐ��j��Nh��B3���1��Bˆ&�wv4�<�	9,ͼQCTL
��ͪ�6�x�&�!�#%��#�
jWx^��@k+��¶�78������@x����~lOi6�����0��l�1{P���_m8�Oh�C�e"Q�#��]G�%ǯ*QT������5i��C�anv�h^������W�PTRsD�=X�r�*$*j�ʵ�vM:�/���Xf�h�p8��7��b�϶E��+�[�R�X���8��{�*ǌwʽ(~S/,c�d!�3�������[���	��W�����#徧U�o�8�M�l�+��Ę�ŇP2y$Æ,=1'\�9���a0KPG(�Ҁ�hggNl����d���x�y�7� Ȉ�% ���J�bn���RE�����@t�ۛM��}J*;���kX����|�����4����$`4�R�icFhfT׻Ig��V���'��� J�7l4V��`˙C>͊�M#<Xׅ�3i��Qw��g�\LU�ü��?d�ZXQh�U˦b
�m3+2�(y;� �?��`�_�ʒ�G?�"+��ji�v��Fn)v0���E �8��<L��M���3�z���-\	��'V��DƜ8�}�~�)��f��Z��|]�D���3W�����i�2w��!D���#�.�_g-��*<bjdZ�	{
T}"֎+��������$S
�K옵���h�7�'�.S�&{{�u<�e���X,"��]���?݋,�Ty�m��F�{8>�Ь����կ���!��s���+�	�2�#���(�Ύ��;Vg��G�7=P��g[bi��Ҟ%�S�/>���^��z�����B����������^�I���Q� f��TJ�R��_V<����$50��z^��Sod��g�\����"���C�๗�,9��4t��}U�h��;��?L����-cT�%�U��:��*�9d�(�����<O�U��U��$i�ܚ���n|�?�\%ߙ0�����ʮo[ӈ�x<��ƫ����9ЈZ��ޠꑪ���J"1#��d+�ZfoQ	��m�*=v"�+6���->Iۍ��qO@o�O�s����6��LlwU����]�C:�T��@�`\���G Bg�@9��%����g�8ǹ����w�IMz�T3���AM/��qq��Cˑ"�.�����?������r�wMŊU�u_��O�y�"ߺ��`��ODn�v���W>{�K'��.aDk[vhC�w��Ud�겒��H�q
̽�	k��*�:?=�����xrz~��''������j�wl    ^bЇ�?�,J�H#�C<���ӐQo�u"C���"�jD��!K��R<z('�9�M՚�`���Dx��U�&�+	�]�-n�^���B������gW`}�([�A�$/���S����ݷN��w����TC�c#����F�tMV_��"��9yc+<�i(
ɞ[�!�:����WɋW����}�<~��۷/��2y��۷��|�\~�������'O�]^&�����̎���=�&y��g����~�����OU�!5L�Ȓ�[��#��;��qR����}�tl�)�N��8�L��H���\s&z�j�U֋�2Ob�ғ�@o�T�ƉK�� �I��.9��L�6)�E��)�[-�����M��	�����ٕ�9X҂��p�୳dM�x՘HX���	/D�}}�����X$9��ݣ,]/&�� ~�O"Ms����h��#Rn���D�zTŞRc�}��Er\�Ew��'06-Ze�Nk�M�Dr������Ɉ�k�Od|w{!���MP���9M8�YfS'�sDmq��R�;� �Kp��^���W&Ýܽ���ǭ��@��Ѽ�!���7�.���tZ�U��X&��b{�>S��������O���� �n�l8M���+��Kz~�g$��ɫJC�9Lq�&�0::;�>c�h[�%QWaaN�2�W߿���^�CK�o����b�D����B�@̪`��k�x�c�a��/�{1�LkYI���գ#��*6��s���q^J� �㡏�cI-8I�ջx��|{��_}�q�Wb�����
�|{3�n�3��qp|#���</D ����<�jy��{��J��퍋R#�V\�`���������z�<��仄���-��y�Y<rr�$�1bt��0*/�<:����}+�H?�M�XBO�\���w[�fw����I�Ea��8Q��
��U����q���Er�?��0q�C�m�d]]v�����F��Ϥ1[��%��+NP����/��<g�G�CcykQ�b>`}�u+E��ۢNA�Ş���3Aw4��s�D@@`��;:���!�(9&��U��M�E뜯1�<M���q�2���F�Su.]sH�5����� �Oq�B�wh���C0�	Z���̡$!���W��L�ѡQ�E۩��Оo9��㙩3��2��|727r&b��@ ��B�5
d@��h�[$ӊ��Q�wb����l�|�����9��X爔,���5�#��Z#GРHQך�����8�N��d���O�E��t]�-4���cܧ�,y�gPG�Y�W�۠I����#�Xp�*׆SGcD�B�v��4]o8&�4� ��\�ۛzD��FB��������܈�&����:_W���Y�7�F�8�Zf��0�fHE�Q>�޻�[����WU�Y�{�"A$H�Jd��@=#�}�5"��Z% /��j���A/	R��	ۧ2�h-�Y�x�|@?%��#��&S�&�D-���I�nJ�@�p�!�6X����!�B�r�1�E]o���y$�Hj����,mr1�E��9�b��O��4;B͆:��i���沥�C钗Վ�q��Zu��Z��G���QyH�ƻ|�2�d��EGr�G�dbGAIÏR����0ݫA027�p�.+���\-�!䉹x?#���'^D���4�ka�.��Ll�(��@���3-��ڜFH��ڕM���	Yw��NT
�#�R���*L��E
������Ʌ[؅�y3c��>�\�:|9��^k\��C���l�F�"��@��D�]�&�y��3�I>Gv*�TX��(���� a`^��ـ �Lb����"��g�4'L�P���uc�,ѱ���Y�27��]����9�S�v�j� f�C7X/�<��Π�2�4>�ñYU��pj��"���M�[B:�L]_9x��f���H����
�ټ��M_m<h ��َj�3���I5挝eD}Ϭ�bS�J��Ɲ"����
6����v5�fbŮ�<.��9�UyőQ��tZ��â��P4��_B.l�vVR��9z��"����<4`P����O���5�I�+c3�M*ѐ�F��W� y�P醭K%҂��ޣxD�K�$3�����`Q�V���̓�����C�\� zS�&����ty�����e�0{eD��C{N'��`��TDD{�3�%XnM�BVڃSLAWj@g���Қ��1h�r����9��^�FT�_��.8�]�L�l�9g�7��R�
���ҿŒ��[�Eg��j�J`�˄��Z�m�QӭDAJS����o��ͽ�tv�
r_]�YVxx<JJ"��|$��M���d"��H�.r>؜�ln���@D��e���@�N"\\�Ǆ/(j��S��n��A 3t���a]��%�����>4���&�s�a���v6,0�`��&��(k��`N8��v�D:���y;KZ��>
�L Nq7'^��bƘ,9^
K�������|G��S��C�HП��T\�8�;���;gz`.w�C�hdEZWE(�)���5����M�KNK����-/�-c��"�����qh��Zr>���0V�d`�yD�A����쾇�_!��=7�>SD,<���@�i��\�:s �5�ڜ�p�cn1��=�
�,L���Zჭvj��C�4�T_�{��KM�n"�U��T7ҡ�!/�VK�U�Ua�#�&�Z7�~�p�n�]%��!|4�U�r�L���R��lj��^`5�}�"���$�=��k�8�:���5�?X)$����+p"����(��ޥ���p^?����4�"}�͇�b�M���Ģ5G���C~��_j��ʄ�������H�$듋�^�N?	2�j�f��MH�AFTqԬ���'j�����K���7<�?<�`�[�-�7c}|�IpM��6�B� �I.!����ڑ��>+;_MN��'�)���f���6����Љ"1��"h��@�
	�z��e�L�5�	��Ϊ��9�t@�Mqd�A[��fUZ7�ߏ|��t�[���3����E�B#�����m
�$�%�z���)&���xsT�XE(јy!�(�"���i=(A&��؄��-�x^MB�A�J�A�W6��Qܚנ�=a���7Y:���� 0�0oV�9��3p��R��4�>vS�^;��7�����| ��H�%���>0X4�E�M��| �����آ���# N�N<�8e%i�RX%���M�
��Ҵ��g�Gi\v��R�X¨� '�k�;{�4~��Z�pItjA5M���y�os�%��`��D�rEm`���Z콩�uO3�}F�/��ߡ�(�,S�։�����-9&(�k������ݹFc������t�(� �02����Ϊ/�19�Xd�|�mhC�v��ɇ�b��M�Rc��OF�=p��h���u���G��C�R��\�� �՗3�����qsb�/��d2�����NZhΡ>ً�l�5��,TE�j�9���p�J"Y!�,�,�����F�����b�ù=�p.��ō�������W]`�#G���b�&??v!�O�� ���[�CP�
��W>�~� �ȫ���%�# ��ZYQT㻻�����]ѤCˎ���p��S%g�IPև*�	o�x�|0�g���ǡ7�9�c�Rx�̦7&�ȈI̡���>���f��N��	�s���Cmމ�iVH��Qͺ�j]I�kL�����&��xý�F#@|�Ё�X�?�+ٝ�FH=������u��Â��u�R��_x�Dr�a,'q�<��]����5�ئ�c8N�&�X!s��fP U������W-�m��5�����_"0`chW�OL�v���IŐ#T�x=�k�Nv������y$������H�jb?(��\D|�����F�x
�}���=J�Ϯ[Z�����ϩ��G��A�>�\��:+rE��z���� �����'���4A5��9�O\�����ı�`E:�K�N( ��|!?�Z�    8��a¹�'�m���)`�#���-6�[�1n$H�\r�9(�]��Ex3-������Z��T��]P���#��"C�\�1)𙁕j��<�fA�,�gHy��w$�P�q�u�fD�K�{�Qmy�(���g�y�z�l^cp`�D8�z䎺ls��4��e�bIfV���caRA�ھϊ��s	��F%���T���I.��&Gѷ]c���y<s<N6W�����#)�����x�VU�.��~���.X�D5�˿AXK~���<昃�jh��k�>T��C���T�w��EV&-Iy������rI�HH7�D4k�~�!	�R~P�6RP�L�.Vd'VTT�h�R�^O����ֳ����W&��*�cYĝ`XZ>Ф�g@������r�b�w�L�r��>Ġ����0���@�pA��E�R{�B�K0�x�*�D	Ҝ�6�r�-��:��Ne����Nt�y�����ZM~!���Xcx�+��
��i�pB�N���\(��̟�����Nεr��y0�'&�'���l�\��%OL���f�5�>E��@�F�����" 9�+g����U��4��S�G�]	���)R��k/�y���Ǻ���J��C�XA����>���,&�7���Ȍ�+(�>�l��h��T��f5�jЈ��@�\�A�
��T�����m}��l^�j�F�68ym���dGO3%gU\A�:V��[Uv��"u)G�ހ�BԊ�t���a��&�K���ab}t�A	�{��=y{�k�_z�-I�C����J�s\����b+[œdE8,�X�6�L�daY�x>��p�D�{90����BC I"�=@�WeďE�BG��o�(rˆW̓�����ͮe��p�iX~���:gW����3�kb��Ԝ��*��b�N��hd�%�0�#�r��;:/t�$�!-��m�s�����=����E���%?�k�����'�6����������t�^s��28��-�/p���`�E�oo8���7�}�_j��<�-cݘ�C;d��D��N��}N��o��!������<�6���[no�	E!@�N�T^ n�K�懌����Ze��@bOE�ğt��ђJ�O��A�e9�jWǡɼ�	��/�I\�;�)���1�����EKso���,q=z��d����e�R��C�pT��!4ug^�8 4#�:� >	XX;�a�Ap�y�[R�:.:D��=�c<Y�G	"`\ˠ����lq��аN���R�� a�f\��[V��K|���	���%K#�:����VZ�Uv���/t�܍q'�O�P:�(H4���${ӡ� ^t���\*����1�֍ =coO`��Ĺ�Ղu`��[i�����U�"�i�?����)�u��3����1_[�f�ȍ��Ɓ����*4 � �����M���3N9��DŋR�wQ}#+>b�	��?�o��`�qiGZi���\=ؙ�vJ>��Z���뛷�����Uߍb�7l�Bn��@qk*1���W���=��ӄ�2�E�eY�JtR�{°�c�I(�Z�.�L�Y�x;�Б�K2��;��~�j8�O)K6��H*�7��SSgDr�R��D_�ҹ��!^JN��Eb�D���f���4n��5R{Zˉ�ɠ�K�E�f���غ�d.�I��p���A�*&�I^C��{���"��+Ձ��w9x��!XK�t5�08�&�����?!U?�iv�o�5���������v�մqh�/ipT����n�o�P�R�Hz�	��!�� ���
��v�䁉{�/���;U����"�ϖ=W��7%���$�)	C�d�.�{���qk��Թ��J�3
*���&1s�f=>���#ʓu�_GD�؆�T���	J���K�'%�<:)��N��
5�.��׉;��?'��ҁov�yv��Z�Rw�_7�W��P����C�����|\�����+V):Y�X�x9h�(�2O��i
}�qM?��vd����d9R-5�V�σp��?2�����B��};$P��ѫ��v_����	�#̀�z���r��8�ظ���Y�a��0\� �^r?Y����K�Γ ������f`�&�K�NO�uxؒc�7o/���K_N���7���P��[w�%��ԗ�CE*T�Q۬⺨i=D*�hb�K)��uVvf���� �o2-������K/;��(�1?�At=�G�z[�&� �\��z� F��f8��&r�z��*La�.{�zS���qxZ�� �{�}-�'L��%���3�cPQЯŨ�K����!�z��<\���+��%z�~�	ɮ	�`�J��A�z�4�d�\��v|?$ȩ�q�SDX���%׌7HJO'�Z�P8�͑��}"U�#uq�CXz��B� ��W.�)	Ll˜��x7��2F��A[&�1Dg�}-��]���b�M�O��+['S���BM~���_G���b�i\��!�H��c\�0$t��#���x�����C���@��D�7�\��Վ���v��ǵId?q�u潎�v���KA��@�� �UE�i�Q���(�,r<K�q����Ƭ�c���]�'��|c�6FT|{"*Hfl=
Ѳ+)�J�I�w�:���;g���!��֕�܊+��<y��T=��*a���ip�;�
��i��3�6q�R�Wߒ�,CQO*����9e���(n�7י �����N͆�ˠZ�H������LQ=�w�j���Ƒ��:e	 ]gR[Е`�yP�&��n?s���:���Q�}v��|f�F���ƥ��Q6=���ڡ����?<'N?������˗t�������j�ֳ���"4\���դ����EE &_��
Zp-�`U��F���[#w�έ�C��H-�#AZ�=\g�j��*%�N�|���qL�^��wa�����%�jȉpK���)�sgȺHcQ�zQ���J�dB�g���޵V�bP$�WBMU��$��<Me��_#���p�0e9l�VKZ-��x�D�}E��{bFC��sJp��KЫI����v�%>�:�T�Y���90���>*��P��+�EW��8��� ưO���Ch�������ˇ��.%)�jn9�#=�6Vp7OS�������j؀�hL�oc����}�埭*Ŀb5tB'��x"
1psa��]�A(����d�L����౿d%��0�C�U��A��X"s���m����f�w���%��
���-�vW�,
̀=�R[?˄���s$۳�C�k���!3�DN#"������5D�t��ʚF�FB(���m�6��� 6� &
�%e$�~��t��8���]�M&�B�����5FZJ��ߝ����D�rht��� &$�ᾔՑ�zC�j�n5%!�E�fc�0�I �qXC���gqcԵ-����V+r�5In���.��*1�E�f��S��-�?y�"�^�'�Y�y����H���]c�M0f���P�g��@`w�����Bp�xFA��WպZ�ï� ��ү��`?4��I)�0���{͒���֛Y��YyX����q�)�Y2���[����$:ĵ0��3���u&� 3;0��n� Y~�]�j�^V�!�i�s�֟%�FC��X��M޾�a*Z$C�����ΜI�E�l؀���f9���h:��6��+���t����s��HP�n���YW�<���*5R��]�?��7Ӿ�w�	c��7=�&�s.��7[�8����΂�%��Q3.�[n�ao�Q��tGU�('x[�x�.��=V<�_��l3m�*����Z��]Ս�̭jEa[K�Cd7Z�����$N��~a���k�:��=t�fG���j���Qi�S��q���85�
ٔf��K�]�{;��]�����&	�V-�S�J�#�$$@
_�"p@o��� =-=����7��,��X������	�6��Uj�%�� Dϩ��"x�7��i9�&& �	  GRKV%�ru�P�Cep�s��j�W1W|��W�,=ʵ4��h����Q��S'���]ě�7L�8/k�Uy�<���ez\x�p��+\���<�YM�����N���1�kb�[���&�d4Ƒx���M�/��{0��W}cF`�����Ab�~�ވ���~8h�d�9�tI�.o<=D���o��x�c�ʨ����q]B�r�h��Hl�O}��~���<�pY� ���f)��a�� 0�]�'��^"0�`F�]��]]����X�U2�#�Z1n��[�K�t���R�ޖàF��᪍v�3����͚��rY�c�Kz��4QA���z#WΡP�vJ����@���KF �ǹ�?=�4^��3�B�$t��+8���?�pΌ����8����j�3`�jF^��hfb3s�V
�ڄ��>4���<I�g����b���ѣ{n*��F�W���VWk�;s��Ys��'.}�������{����)�^A�%��wô�`'����J��g9>vV3��5�'�mͻt�qc4}�&�}��a^�R��U�8�Q��Pƃ�0��-;#=�m���uc�;u;�n7- o-}uĠ��y���c�b�k�:�=����owx�q�S�<�fZ!��я�k��lb�1��w���M�Je  \�Ri*A~�ܤs��ċM��Tf{g�zn�blo��I\d��0}l���,|�>����]*��л���A��� y��J|����ztܮ\���Ff�V����#a�F^�J���,+�!��8����Y�̐L^��)��ȥ��a�����y]�%�B�n`#�^/o�RWo�cyW�dקu�`B�@��c������wԛ}B̎�������PG�s����s�AXE��G��;�7��1D�!���	�%��+db�|a8�J�Ǿ4�#WO2'�D����F�\ݍ�v͙��@�>8�8�B���m��(����^^/D��<<���.H &�*�"Tݽ�|�U*�A�#� Ň���1�V-m&��t!W��s�z����E�)��ɉ�F.����8p��-iQ�|vO/s�[xM��d��;�Q ]2�����\J����n'��xRX�C���?|�襇P������6��3,��d���XV�;�k�,�\�B�[�\����o�x��i�����FY�ca��i��ϒ�w۴�V��^�*�h�\O��z�����U�H뮊5���Ɨ�*G��Z�h�+u,k��ޏ��X����9�u��ld�@�ԅ��9�Ս��h��k=�v����flG�h�n3M�Cm�;�׸L��^0k���W�J�̵��#�i4��4Q�8קf�e���眱PT6�YbL���=��1GߡkY�*d<E�Za�S�񑭚zƐ
o�=�a)�� ��j��+��7X��������0���u�20�ٕ0~��-��)���9� �8	<h�K��AMƳd�\vَ��}��ũ똭f�;?1.X�͛ׯ��x�e�����o�%�}E�2>�M]E+e	O����B�����=��w'��/�A°�@d�,��֬�Z�@ҽ����?=�q��p��z�tg����5
�+:�Y��ev^�2V�r YZ���h�,)��q��G��د�?���q�jDb�tE����m_����Ç�4���p��ǝA�V�'8�g��r誁u�Q�`���N1i�a� ����ԄvJ��%�4w���9z���r(�#7���$���5#o=�ԙ�Y�h]���˻,�4�cF�7�j�!rᛪ��~�$�l�gd�q���H(���˷I8z�P���]��$��)�U���c���f��mF��{�
�O���R�	�4)_�)>H�����(L����%��ԩ9�-��ƫ����<�إ�,n�Y�qg\��"�{����,w��|eM���f����4
i�D��L1`yꮢ"�[K��`�8��p6`�aX6C3��ܧ��TTicS��O�R�6*	��J���vW�r��c�A%}�J���*���\�>$�����wLs��>�]�<h�fx�nO��D���&o泐BV*� � U_ڳvA�~u��c �%%��'u2�� I��p�k��oi߇:k��,yS��!'NsX"v�D�rq|o�-zf�c���6j>�C���D9�3�Kͪ��`��HCQ=`���	��&H�փS5X�^)�]*a�$ӱ��/�bפ�].W2\s��=õ��{������V��<>��@h�c{�w!ߐ?b�`v<�����/��
ʬ�4 �,~2gG�d.���xYh��#�Do�j�����Y����{��iHv�g�QD,>.����r�}�X�:4�>�40^c��������_�<�}W6�#�l��eE
%��ſ�$��B�k�rI��~��}��'����      #   J   x�3�L����L-�2�L*JML�2�,H,.)	�pf���s�rz�(3� ��9DM%�DS1�%gaifr6W� _NI     